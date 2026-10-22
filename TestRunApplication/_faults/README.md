# Seeded-fault harness (attestqa evaluation)

What it is for and which faults: `research/SEEDED_FAULTS.md`. Node built-ins only.

| File | |
| --- | --- |
| `faultproxy.mjs` | The proxy: passes an application through, changing one thing for one fault |
| `run-faults.mjs` | Control run, then one run per fault, with plain `npx playwright test` |
| `<app>.json` | The five faults of one application |

## Setup week, once per application

1. Save what the browser receives (the app must be running; SauceDemo is online):
   `node faultproxy.mjs --upstream https://www.saucedemo.com --dump`
   (for a page the app only loads after sign-in, list it: `--dump /,/inventory.html`).
2. Claude reads `bundles/<host>/` and fills each fault's `find`, `replace`,
   `storyId` and `confirmedOn` in `<app>.json`.
3. Confirm every rule finds its text exactly once:
   `node faultproxy.mjs --upstream https://www.saucedemo.com --rules saucedemo.json --check`

## After an application's stories are done

`node run-faults.mjs --app saucedemo`

It runs the control first and stops if the control fails. Results go to
`results/<app>/`; `summary.json` has one verdict per fault: caught, caught by
accident, missed, or invalid.
