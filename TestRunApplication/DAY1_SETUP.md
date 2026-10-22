# Day 1 (Sat 17 Oct): get Toolshop, Booker and SauceDemo running

Goal for the day: each app is up, its test account works, and one story per app has run through attestqa. Send Claude the output of every step that fails, and the end of every `aqa run`.

Before you start:

- Docker Desktop is running.
- Juice Shop can stay on port 3100; nothing below uses that port.
- The engine is built: `npm run build --workspace packages/core`, from `E:\EB1A_Research\Application\attestqa`.

---

## 1. SauceDemo: nothing to start

It's the hosted practice site at https://www.saucedemo.com, so no Docker is needed.

1. Open it in a browser. The login page lists the demo users and their shared password.
2. Copy `packages\core\examples\eval\env.saucedemo.example` to `packages\core\.env.saucedemo` and fill it in:
   - `AQA_APP_USER` = the standard user, with `AQA_APP_PASS`;
   - `AQA_LOCKED_USER`, `AQA_PROBLEM_USER` and `AQA_ERROR_USER` = the matching users from the login page;
   - `AZURE_DEVOPS_PROJECT=attestqa-saucedemo`.
3. Check that the standard user can sign in, and that the locked-out user is refused.

## 2. Toolshop (Jira project TOOL)

In PowerShell:

```
cd E:\EB1A_Research\Application
git clone https://github.com/testsmith-io/practice-software-testing
cd practice-software-testing
```

Make sure the repo's `.env` has `SPRINT=sprint5`, not the with-bugs edition. Then:

```
docker compose -f docker-compose.yml up -d
docker ps                      # note the API container's name; the README expects pst-laravel-api-1
docker exec -it pst-laravel-api-1 php artisan migrate:fresh --seed
```

- **Check:** http://localhost:4200 shows the shop, and http://localhost:8091 answers (the API).
- **Account:** `customer@practicesoftwaretesting.com`, with the password published in the repo's README. The admin user is only for the admin story.
- **Env file:** copy `env.toolshop.example` to `packages\core\.env.toolshop` and fill it in. `AQA_APP_URL=http://localhost:4200`.

## 3. Booker (Azure DevOps project attestqa-booker)

```
cd E:\EB1A_Research\Application
git clone https://github.com/mwinteringham/restful-booker-platform
cd restful-booker-platform
docker compose up -d
docker ps                      # find which host port the UI is published on
```

- **Port:** our config expects the guest site and `/admin` at http://localhost:3003. If `docker ps` shows a different port, tell Claude before running; don't edit the config yourself.
- **Account:** admin, with the published default password (it's in the repo's README).
- **Env file:** copy `env.booker.example` to `packages\core\.env.booker` and fill it in. `AQA_APP_URL=http://localhost:3003`, `AZURE_DEVOPS_PROJECT=attestqa-booker`.
- **Data reset:** find out how Booker resets its data between runs (restarting the containers, or a reset endpoint), and tell Claude.

## 4. Workspace dependencies (once per app)

```
cd E:\EB1A_Research\Application\attestqa\TestRunApplication\toolshop
npm install
```

Do the same in `booker` and `saucedemo`.

## 5. First story per app

Run the first story in each app's seed file:

| App | First story (seed ref) | Find its key in |
|---|---|---|
| Toolshop | `browse`: Shopper browses the catalogue page by page | Jira, project TOOL |
| Booker | `home`: Visitor sees the B&B and its rooms on the home page | Azure DevOps, attestqa-booker |
| SauceDemo | `login`: Customer signs in with a valid user | Azure DevOps, attestqa-saucedemo |

From `E:\EB1A_Research\Application\attestqa\packages\core` (example for Toolshop; swap the app name and story):

```
node dist/cli.js run "Write tests for TOOL-<n>" --config examples/eval/toolshop.config.yaml --workspace ../../TestRunApplication/toolshop --env .env.toolshop,.env --dry-run
```

If the dry run looks right, run the same command without `--dry-run`, and approve in the dialogs.

For Azure DevOps stories, the story id is the work item number, e.g. `"Write tests for AB#88"`. Use the format that worked for AB#1.

## 6. Done for the day when

- [ ] All three apps are reachable, and the test accounts sign in.
- [ ] A dry run is clean for each app.
- [ ] One real run per app, each output sent to Claude (green or not).
