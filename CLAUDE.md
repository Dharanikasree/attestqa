# Working on attestqa

Before changing anything in the engine (`packages/core/src`), read
`packages/core/docs/ENGINE_MAP.md` and follow its fix protocol (§10):

1. Find the stage and its owner (§2).
2. List every rule and loop control acting on that stage (§5–§7).
3. Change or remove a rule before adding one.
4. Replay the real ledgers that showed the problem; write a test from them.
5. Run the rule-interaction tests.
6. Update ENGINE_MAP.md in the same change.

Other standing rules for this repo:

- Secrets live only in git-ignored `.env` files. Never in config files, argv, or chat.
- bdd2pw and pw-self-heal changes go to their own maintainers as handoffs, not edits from here.
- Git commits, pushes, publishing and tracker writes are done by the user.
- Back up a file before editing anything outside the repo: `<name>.before_<what>_<date>.bak`.

## Where the work is (from 4 Nov 2026)

- The backlog and its order: `docs/HANDOFF_attestqa_development_2026-11-04.md` — the 27 open
  W items from the October evaluation grouped into 2.0.4, 2.0.5, 2.0.6 and 2.1.0, with the fix
  protocol in its §3. Work that list top down; one changeset per W item.
- Releasing: `packages/core/docs/RELEASING.md` (four steps; the pipeline is token-free).
  `npm run preflight` at the repo root before every commit — it is exactly what CI runs.
- Versions: one number everywhere (ADR-005); what is published where is the version-of-record
  `packages/core/docs/VERSIONS.md`. Next patch 2.0.4; features go to 2.1.0
  (`ROADMAP.md`). No contract change in 2.0.x (`packages/core/docs/TECHNICAL.md`).
- How the documentation is organised (living / frozen baseline / history):
  `research/decisions/ADR-007-documentation-structure.md`.
- The papers are a separate track and use attestqa 2.0.1 with its frozen evidence under
  `E:\EB1A_Research\EB1_Master\06_Authorship\Paper_I2_WeakeningStudy\Experiment\`. Never run
  paper experiments from main, never edit that folder from here, never build a
  governance-off switch into the product.
- `git add` files by name, never `git add -A` (agent screenshots and local workspaces sit
  beside the package). Format with `npm run format` in the package, not a bare `npx prettier`.
