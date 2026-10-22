#!/usr/bin/env node
// Brings a freshly restarted Juice Shop to the state the evaluation's stories
// expect (research/EVAL_START_STATE.md): the test account in .env exists, and
// it has at least one placed order. Restarting the Juice Shop container wipes
// everything created since it started, the account and its orders included.
//
//   docker restart <juice-shop container>
//   node juice-shop-ready.mjs [--env ../../packages/core/.env] [--url http://localhost:3100]
//
// Reads AQA_APP_USER and AQA_APP_PASS from the .env file; prints neither the
// password nor the token. Uses Juice Shop's own REST API, as its web pages do.

import { readFileSync } from "node:fs";

const arg = (name, dflt) => {
  const i = process.argv.indexOf(`--${name}`);
  return i > 0 ? process.argv[i + 1] : dflt;
};
const envFile = arg("env", new URL("../../packages/core/.env", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1"));
const env = Object.fromEntries(
  readFileSync(envFile, "utf8")
    .split(/\r?\n/)
    .filter((l) => /^\s*[A-Z_]+\s*=/.test(l))
    .map((l) => [l.slice(0, l.indexOf("=")).trim(), l.slice(l.indexOf("=") + 1).trim().replace(/^["']|["']$/g, "")]),
);
const base = arg("url", process.env.AQA_APP_URL ?? env.AQA_APP_URL ?? "http://localhost:3100");
const email = env.AQA_APP_USER;
const password = env.AQA_APP_PASS;
if (!email || !password) {
  console.error(`AQA_APP_USER and AQA_APP_PASS must be set in ${envFile}`);
  process.exit(2);
}

async function call(method, path, body, token) {
  const r = await fetch(base + path, {
    method,
    headers: { "content-type": "application/json", ...(token ? { authorization: `Bearer ${token}` } : {}) },
    ...(body ? { body: JSON.stringify(body) } : {}),
  });
  const text = await r.text();
  let json;
  try {
    json = JSON.parse(text);
  } catch {
    json = undefined;
  }
  return { status: r.status, json, text };
}

// 1. The application answers.
for (let i = 0; ; i++) {
  try {
    const r = await fetch(base + "/rest/admin/application-version");
    if (r.ok) break;
  } catch {
    /* not up yet */
  }
  if (i >= 60) {
    console.error(`Juice Shop did not answer at ${base} within a minute`);
    process.exit(1);
  }
  await new Promise((r) => setTimeout(r, 1000));
}
console.log(`Juice Shop is up at ${base}`);

// 2. The test account: sign in, or register it and then sign in.
let login = await call("POST", "/rest/user/login", { email, password });
if (login.status !== 200) {
  const reg = await call("POST", "/api/Users", {
    email,
    password,
    passwordRepeat: password,
    securityQuestion: { id: 1 },
    securityAnswer: "attestqa",
  });
  if (reg.status !== 201) {
    console.error(`could not register the test account (${reg.status}): ${reg.text.slice(0, 200)}`);
    process.exit(1);
  }
  console.log("test account registered");
  login = await call("POST", "/rest/user/login", { email, password });
}
if (login.status !== 200) {
  console.error(`could not sign in as the test account (${login.status})`);
  process.exit(1);
}
const token = login.json.authentication.token;
const bid = login.json.authentication.bid;
console.log("signed in as the test account");

// 3. At least one placed order, for the order history and tracking story.
const history = await call("GET", "/rest/order-history", undefined, token);
const orders = Array.isArray(history.json?.data) ? history.json.data.length : 0;
if (orders > 0) {
  console.log(`the account already has ${orders} order(s); nothing to place`);
  process.exit(0);
}
const add = await call("POST", "/api/BasketItems", { ProductId: 1, BasketId: String(bid), quantity: 1 }, token);
if (add.status !== 200) {
  console.error(`could not add a product to the basket (${add.status}): ${add.text.slice(0, 200)}`);
  process.exit(1);
}
const checkout = await call("POST", `/rest/basket/${bid}/checkout`, { orderDetails: { paymentId: "wallet", addressId: "1", deliveryMethodId: "1" } }, token);
if (checkout.status !== 200) {
  console.error(`could not place the order (${checkout.status}): ${checkout.text.slice(0, 200)}`);
  process.exit(1);
}
console.log(`one order placed (${checkout.json?.orderConfirmation ?? "confirmed"})`);
