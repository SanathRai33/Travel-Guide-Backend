# TravelGuide — Backend

Short description
- Express.js API for TravelGuide (hotels, packages, restaurants).

Tech
- Node.js
- Express
- MongoDB (mongoose)

Prerequisites
- Node.js (LTS), npm
- MongoDB (local or Atlas)

Quick start
```bash
cd server
npm install
# start (production)
node index.js
# or start dev with nodemon if available
npm run dev
```

Environment
- Copy or create `.env` in `server/` with values such as:
  - `MONGO_URI` — MongoDB connection string
  - `PORT` — port to run the server (e.g. 5000)
  - `JWT_SECRET` — (if authentication used)

Project structure (high-level)
- `index.js` — entry point
- `src/app.js` — Express app setup
- `src/db/db.js` — database connection
- `src/routes/` — route definitions (hotel, package, restaurant)
- `src/controllers/` — request handlers
- `src/models/` — mongoose schemas

API Endpoints
- Routes are defined in `src/routes/` (hotel.route.js, package.route.js, restaurant.route.js).
- Base path is typically `/api` (confirm in `index.js` / `app.js`).

Tests and utilities
- `test.js` and `test_model.js` are present for quick checks — run with `node test.js`.

Notes
- Ensure MongoDB is reachable and `.env` values are correct before starting.
- If you add CORS or other middleware, edit `src/app.js`.

Contact
- See repository owner or server maintainer for additional deployment instructions.
