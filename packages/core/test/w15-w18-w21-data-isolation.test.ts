/**
 * W15/W18/W21 (F-0097/F-0100/F-0104): per-test data isolation for stateful
 * stories. SCRUM-19's basket tests shared one account and ran serially, so the
 * product one test added was still in the basket when the next added it —
 * Juice Shop answered HTTP 500 and a badge that expected "1" read "2". These are
 * test-isolation faults, not product bugs, and the agent repaired locators for
 * nine runs instead of isolating the data.
 *
 * A design rule requires a stateful item to name its isolation; a review-only
 * verifier check reports a stateful test that isolates nothing. The patterns are
 * taken from the real SCRUM-19 spec (run 20261023T190916Z): AC-1 added via an
 * "Add to Basket" click and never cleared (the one that broke); AC-2 fetched the
 * basket and deleted its items before adding (isolated inline).
 */

import { describe, it, expect } from "vitest";
import {
  validateDesign,
  traceProblems,
  mutatesSharedState,
  statesIsolation,
  bodyMutatesSharedState,
  isolatesTestData,
  type TestDesign,
  type StoryFacts,
  type DesignItem,
} from "../src/design/test-design.js";

const facts: StoryFacts = {
  acceptanceCriteria: ["AC-1"],
  bugs: [],
  tasks: [],
  story: { id: 19, title: "Add a product to the basket" },
  epic: { id: 15, title: "Finding and buying products" },
};

const basketItem = (over: Partial<DesignItem> = {}): DesignItem => ({
  id: "D1",
  covers: "AC-1",
  type: "functional",
  technique: "state-transition",
  conditions: ["add Apple Juice to the basket"],
  expected: "the basket badge shows 1",
  source: "AC-1",
  ...over,
});

describe("W15 design rule: a stateful item names its isolation", () => {
  it("flags a basket item that states no isolation", () => {
    const d: TestDesign = { items: [basketItem()], excluded: [] };
    const problems = validateDesign(d, facts, ["functional"]);
    expect(problems.some((p) => p.includes("changes shared server-side state"))).toBe(true);
  });

  it("accepts the item once it names a per-test isolation strategy", () => {
    const d: TestDesign = {
      items: [
        basketItem({
          conditions: ["each test registers a fresh account", "add Apple Juice to the basket"],
        }),
      ],
      excluded: [],
    };
    const problems = validateDesign(d, facts, ["functional"]);
    expect(problems.some((p) => p.includes("changes shared server-side state"))).toBe(false);
  });

  it("does not fire on a read-only view of the basket", () => {
    const d: TestDesign = {
      items: [
        basketItem({
          conditions: ["view the basket page"],
          expected: "the basket lists each item with its price",
        }),
      ],
      excluded: [],
    };
    const problems = validateDesign(d, facts, ["functional"]);
    expect(problems.some((p) => p.includes("changes shared server-side state"))).toBe(false);
  });
});

const feature = `@story:19
Feature: Finding and buying products

  @ac:1 @design:D1
  Scenario: Adding a product increments the basket count
    Given I am signed in
    When I add Apple Juice to the basket
    Then the basket badge shows 1

  @ac:1 @design:D2
  Scenario: The basket holds the product after a fresh add
    Given I am signed in
    When I clear the basket and add Apple Juice
    Then the basket shows Apple Juice
`;

// D1: adds via the UI, never clears — the real AC-1 shape that broke.
const d1Body = `
  // @design:D1
  test("AC-1 Adding a product increments the basket count", async ({ page }) => {
    await page.getByRole("button", { name: "Add to Basket" }).click();
    await expect(page.getByRole("button", { name: /Your Basket/ })).toContainText("1");
  });
`;

// D2: fetches the basket and deletes its items before adding — isolated inline.
const d2Body = `
  // @design:D2
  test("AC-1 The basket holds the product after a fresh add", async ({ request }) => {
    const basket = await request.get("/rest/basket/" + bid);
    for (const item of existingItems) await request.delete("/api/BasketItems/" + item.id);
    await request.post("/api/BasketItems/", { data: { ProductId: 1, BasketId: bid, quantity: 1 } });
    await expect(page.getByText("Apple Juice")).toBeVisible();
  });
`;

const design: TestDesign = {
  items: [basketItem({ id: "D1" }), basketItem({ id: "D2", covers: "AC-1" })],
  excluded: [],
};

describe("W15 verifier: a stateful test that isolates nothing is flagged", () => {
  it("flags the non-isolated add (D1) and not the inline-cleared one (D2)", () => {
    const t = traceProblems(
      design,
      [{ path: "f.feature", text: feature }],
      [
        {
          path: "s.spec.ts",
          text: `import { test, expect } from "@playwright/test";\n${d1Body}\n${d2Body}`,
        },
      ],
      19,
    );
    const hits = t.reviewShape.filter((r) => r.includes("changes shared server-side state"));
    expect(hits.some((r) => r.startsWith("D1"))).toBe(true);
    expect(hits.some((r) => r.startsWith("D2"))).toBe(false);
  });

  it("stays quiet when a shared beforeEach clears the basket", () => {
    const hook = `
  test.beforeEach(async ({ request }) => {
    for (const item of existingItems) await request.delete("/api/BasketItems/" + item.id);
  });
`;
    const t = traceProblems(
      design,
      [{ path: "f.feature", text: feature }],
      [
        {
          path: "s.spec.ts",
          text: `import { test, expect } from "@playwright/test";\n${hook}\n${d1Body}`,
        },
      ],
      19,
    );
    expect(t.reviewShape.some((r) => r.includes("changes shared server-side state"))).toBe(false);
  });
});

describe("W15 detectors", () => {
  it("mutatesSharedState", () => {
    expect(mutatesSharedState("add Apple Juice to the basket")).toBe(true);
    expect(mutatesSharedState("create a booking for two nights")).toBe(true);
    expect(mutatesSharedState("place an order at checkout")).toBe(true);
    expect(mutatesSharedState("view the basket page and see the items")).toBe(false);
    expect(mutatesSharedState("the booking is refused when the dates overlap")).toBe(false);
    // Booker (createroom run 20261104T231022Z): rooms and the inbox are stateful
    // too, and a refused creation ("no room is added") must not count.
    expect(mutatesSharedState("Room is added to the room list with the values")).toBe(true);
    expect(mutatesSharedState("a submitted message is added to the admin inbox")).toBe(true);
    expect(
      mutatesSharedState("Room creation is refused with a message, and no room is added"),
    ).toBe(false);
    expect(mutatesSharedState("an error message is shown on the form")).toBe(false);
  });

  it("statesIsolation", () => {
    expect(statesIsolation("each test registers a fresh account")).toBe(true);
    expect(statesIsolation("clear the basket before each test")).toBe(true);
    expect(statesIsolation("use a different product per test")).toBe(true);
    expect(statesIsolation("add the product and check the badge")).toBe(false);
  });

  it("bodyMutatesSharedState / isolatesTestData", () => {
    expect(bodyMutatesSharedState(d1Body)).toBe(true);
    expect(bodyMutatesSharedState(d2Body)).toBe(true);
    expect(isolatesTestData(d1Body)).toBe(false);
    expect(isolatesTestData(d2Body)).toBe(true);
  });
});
