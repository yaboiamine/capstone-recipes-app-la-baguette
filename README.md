# CHAT APP

The goal is to create an application similar to Slack. However, it is important to remember to make this project YOURS!

### Requirements

Looking at Slack will give you a good idea of the kind of functionality you can add but this project is open ended and you can build whatever kind of chat application you would like.

If we were to build something like Slack, we'd probably want to consider the following.

- Users should be able to log in
- Users should be able to create channels
- Users should be able to write messages in a channel
- Users should be able to send messages directly to other users

These are just examples of some core features but you should decide the specifics of the application you want to build.

## Navigating the codebase

This codebase consists of a frontend and backend application that can each be run seperately. See `package.json` in the respective folders to see how to start the servers.
Hint: run `npm run dev`.

### Backend

#### Starting the server locally

In a new terminal window

```bash
cd backend;
npm install;
npm run dev;
```

#### Database Overview

The database connection is established in `src/db/index.js`. Here, the connection is made based on the configurations defined in `src/db/config/config.json` and the current `NODE_ENV` environment variable.

Models are defined in `src/db/models`. This folder is automatically parsed by `src/db/index.js` and every model defined gets added to the `db` variable that is exported by `src/db/index.js`. For example to access the `User` model you can do the following.

```
const db = require("path/to/db");
const User = db["User"];

User.findAll();
```

#### Running database migrations

This is done using sequelize-cli. See https://sequelize.org/docs/v6/other-topics/migrations/ for more information.
To run the migrations use `npm run migrate`.
To rollback (or "undo") use `npm run rollback`.

### Frontend

#### Starting the server locally

In a new terminal window

```bash
cd frontend;
npm install;
npm run dev;
```
