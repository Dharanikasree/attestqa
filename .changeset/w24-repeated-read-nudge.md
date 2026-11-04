---
"attestqa": patch
---

When the agent re-reads the same file instead of acting, the no-progress guard now gives it a read-specific nudge. In six runs the model, stuck on a failing test, proposed the same file read three cycles running until the guard stopped it — the guard works, but its generic "you have already made this exact call" message did not break the loop. A repeated `*.read_file` call now gets a message that names what it already has and what to do next: the file's content is already in context, so the next call must change something — edit the file, run the suite, propose a bug, file the cases — or end the run and say what is blocking it. This is a cheap experiment aimed at one observed behaviour; whether it changes outcomes is a model question measured separately (F-0109, F-0111, F-0124).
