---
"attestqa": patch
---

Reconcile `ROADMAP.md` and `VERSIONS.md` with reality. `VERSIONS.md` showed the current version as 2.0.3, but 2.1.0 shipped on 5 Nov 2026 (npm, Marketplace and Zenodo DOI 10.5281/zenodo.23979481); the version-of-record table now says 2.1.0 and records that the next version is built on `release/2.2.0` (ADR-006). `ROADMAP.md` listed 2.1.0 as still planned for December and 2.2.0 as a Windows app; it now records the 2.x shipped line (2.0.0–2.1.0) and the committed forward sequence — 2.2.0 company sign-in + Bedrock, 2.3.0 generated test data (synthdata), 2.4.0 tracker seam, 2.5.0 approved locator repairs, 2.6.0 local web UI, 2.7.0 budget reservation, 2.8.0 the agent split — with the later major stages (3.x API, 4.x web version, 5.x security, 6.x ETL) redated to follow. Selenium import is recorded as the standalone sel2pw tool rather than an attestqa subcommand. Docs only; no change to the published package's behaviour.
