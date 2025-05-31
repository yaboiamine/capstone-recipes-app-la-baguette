# RECIPE APP

This capstone began as a fork of the **Chat App** starter you see in the repo history, but it’s been completely re-imagined for sharing, discovering, and talking about food.  
Think of it as “Slack meets NYT Cooking” — a place where users can save recipes, post their own twists, and chat about substitutions or plating tips, all in one place.

---

### Core Features (MVP)

| Area          | What the user can do                                                                                                                                   |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Accounts**  | Sign-up / log-in with email + password (JWT in localStorage)                                                                                            |
| **Recipes**   | • CRUD: create, read, update, delete<br>• Attach photos, tags, cook-time, serving size, ingredients & steps                                             |
| **Collections** | Group recipes into user-defined “Cookbooks” (e.g. *Weeknight Dinners*)                                                                                |
| **Social**    | • (Optional) Comment on a recipe thread<br>• (Optional) “Heart” a recipe (adds to *Favorites*)                                                                               |
| **Search & Filters** | Full-text search on title/ingredients, tag filters (vegan, gluten-free, < 30 min, etc.)                                                          |
| **Realtime Chat *(stretch)*** | (Optional) In-recipe chat powered by socket.io so cooks can riff in real time                                                                      |

Feel free to add or swap any of these. The project is intentionally open-ended – build the food app **you** would use every day.

---

## Running the project locally

This repo is a **monorepo** with separate **/backend** and **/frontend** folders. Each can be run on its own dev server.

### Prerequisites

* **Node ≥ 18**  
* **PostgreSQL** (or Docker)  
* `pnpm` **or** `npm`

### Backend

```bash
cd backend
npm install
npm run dev        # runs nodemon on :5000
````

`src/index.js` spins up an Express server and mounts REST routes at `/api/*`.

#### Database

* **Connection**: `src/db/index.js` (uses `sequelize`)
* **Config**: `src/db/config/config.json`
* **Models**: every file in `src/db/models` is auto-loaded and attached to the exported `db` object.

```js
const { Recipe, User } = require('../db');   // example
```

##### Migrations & seed data

```bash
npm run migrate        # all migrations
npm run rollback       # undo last batch
npm run seed           # optional: loads sample users & recipes
```

### Frontend (React + Vite)

```bash
cd frontend
npm install
npm run dev        # hot-reloads on :3000
```

* **Global state** → Redux Toolkit (recipes, auth, UI flags)
* **Routing** → React Router 6
* **Requests** → Axios hooks in `/src/api/`
* **Styling** → Tailwind CSS (utility-first)
* **Realtime chat** (stretch) → socket.io-client

---

## Useful NPM scripts (root)

| Script | What it does                                                        |
| ------ | ------------------------------------------------------------------- |
| `dev`  | Runs **both** servers concurrently (`frontend:dev` & `backend:dev`) |
| `lint` | ESLint + Prettier check                                             |
| `test` | Jest + React Testing Library for unit/integration tests             |
| `seed` | Calls backend seed script                                           |

---

## Environment variables

Create a **`.env`** file in `/backend`:

```
DATABASE_URL=postgres://user:pw@localhost:5432/recipe_app_dev
JWT_SECRET=super-secret-string
```

…and another in `/frontend` (Vite prefix required):

```
VITE_API_URL=http://localhost:5000/api
```

---

## Folder structure (high-level)

```
.
├── backend
│   ├── src
│   │   ├── db
│   │   │   ├── models
│   │   │   └── migrations
│   │   ├── routes
│   │   ├── controllers
│   │   └── index.js
├── frontend
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── api
│   │   ├── store
│   │   └── main.jsx
└── README.md
```

---

## Deployment (suggested)

* **Backend** – Railway, Render, or Fly.io (free Postgres addon).
* **Frontend** – Netlify or Vercel (`npm run build` creates the `/dist` folder).
* Set env-vars in both dashboards, point frontend to the hosted API URL.

---

### Contributing & Branch strategy

1. `main` is always deployable.
2. New work → feature branch (`feat/search-bar`, `fix/login-redirect`, …).
3. Open a PR, run tests + linter, request review.
4. Squash-merge into `main`, CI redeploys automatically.

---

### Inspiration / APIs

* **Spoonacular API** – import nutrition data.
* **Cloudinary** – store user-uploaded images.
* **Redis** – rate-limit or cache popular recipe queries.

---

**Bon appétit — and happy coding!**

