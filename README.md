# RECIPE APP

This capstone began as a fork of the **Chat App** starter you see in the repo history, but it’s been completely re-imagined for sharing, discovering, and talking about food.  
Think of it as “Slack meets NYT Cooking” — a place where users can save recipes, post their own twists, and chat about substitutions or plating tips, all in one place.

---

### Core Features (MVP) - All Areas are optional, make the project your own.

| Area          | What the user can do                                                                                                                                   |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Accounts**  | Sign-up / log-in with email + password (JWT in localStorage)                                                                                            |
| **Recipes**   | • CRUD: create, read, update, delete<br>• Attach photos, tags, cook-time, serving size, ingredients & steps                                             |
| **Collections** | Group recipes into user-defined “Cookbooks” (e.g. *Weeknight Dinners*)                                                                                |
| **Social**    | • Comment on a recipe thread<br>• (Optional) “Heart” a recipe (adds to *Favorites*)                                                                               |
| **Search & Filters** | Full-text search on title/ingredients, tag filters (vegan, gluten-free, < 30 min, etc.)                                                          |
| **Realtime Chat *(stretch)*** | (Optional) In-recipe chat powered by socket.io so cooks can riff in real time                                                                      |

Feel free to add or swap any of these. The project is intentionally open-ended – build the food app **you** would use every day.

---

## Running the project locally

Repo layout: **/backend** (Express API) & **/frontend** (React + Vite). Run each in its own terminal.

### Prerequisites

* Node ≥ 18  
* PostgreSQL (or Docker)  
* `npm` or `yarn`

### Backend

```bash
cd backend
npm install
npm run dev          # nodemon on :5000
````

`src/index.js` mounts REST routes at `/api/*`.

#### Database

* **Connection** — `src/db/index.js` (Sequelize)
* **Config** — `src/db/config/config.json`
* **Models** — every file in `src/db/models` autoloads into `db`

```js
const { Post, User } = require('../db');
```

##### Migrations & seeders

```bash
npm run migrate      # up
npm run rollback     # down
npm run seed         # optional sample data
```

### Frontend (React 18 + Vite)

```bash
cd frontend
npm install
npm run dev          # hot-reloads on :3000
```
