# Aarunya Kids Preschool website

## Run locally
    npm install
    npm start          # http://localhost:3000  (PORT env var to change)

Logins: admin username is Principal (ADMIN_USERNAME setting); admin password comes from the ADMIN_PASSWORD setting on Render (not stored in this code). Demo parent: parent1 / parent123. Forgot login? Use the links on /login; the owner uses the ADMIN_RESET_KEY setting.
On first start an empty data/db.json is created from built-in defaults. `seed/db.sample.json` is a copy of the current content (no booking requests) that you can copy to `data/db.json` to start from it.

Data lives in `data/db.json`, photos in `uploads/` (both under `DATA_DIR` if set). Kid profiles and kid photos are only shown to the admin and that child's parent.

## Deploy on Render
1. Put this folder in a GitHub repo (data/db.json and uploads/ are git-ignored on purpose, so no child data is uploaded).
2. On render.com: New > Blueprint, pick the repo. `render.yaml` creates a Node web service with:
   - a 1 GB persistent disk at /var/data (`DATA_DIR`) holding the database and photos,
   - `SESSION_SECRET` generated automatically, `NODE_ENV=production` (secure cookies over HTTPS),
   - `PORT` set by Render automatically.
   Note: persistent disks require a paid instance type (Starter). On the free type, data and photos are wiped on every restart.
3. Optional: to start with the current content, open the Render Shell and run `cp seed/db.sample.json /var/data/data/db.json`, then restart.
4. Log in as admin, change the password at /password, and set real parent logins in the Parents tab.
5. Optional: add your own domain under Settings > Custom Domains.
