# Railway Reservation System

A full-stack railway reservation application with a React/Vite frontend, an Express REST API, and Oracle Database persistence.

## Features

- Search and manage trains, schedules, and stations
- Register and manage passengers
- Book, view, and cancel tickets
- Record payments
- View reservation dashboard data

## Technology Stack

- **Frontend:** React 18, React Router, Axios, Vite
- **Backend:** Node.js, Express, `node-oracledb`
- **Database:** Oracle Database (the default connection targets Oracle XE `XEPDB1`)

## Prerequisites

- Node.js 18 or newer
- npm
- Oracle Database with a user that can create and query the application tables
- Oracle client libraries required by your `node-oracledb` installation

## Project Structure

```text
backend/     Express API and Oracle database integration
frontend/    React/Vite user interface
```

## Setup

### 1. Configure the database

Open PowerShell in the repository root and create the backend environment file:

```powershell
Copy-Item backend/.env.example backend/.env
```

Edit `backend/.env` with the credentials and connection string for your Oracle instance:

```dotenv
DB_USER=your_oracle_user
DB_PASSWORD=your_oracle_password
DB_CONNECT_STRING=localhost/XEPDB1
PORT=5000
```

The backend also has code-level defaults for `system`, `oracle`, and `localhost/XEPDB1`, but setting these values explicitly is recommended.

### 2. Install dependencies

```powershell
cd backend
npm install
cd ../frontend
npm install
cd ..
```

### 3. Create the database tables

Run the schema loader from the `backend` directory. It creates the tables and inserts the sample train, station, and schedule records in `backend/sql/schema.sql`.

```powershell
cd backend
node loadSchema.js
node checkTables.js
```

The schema loader reads the same `backend/.env` settings used by the API.

## Running the Application

Start the backend in one terminal:

```powershell
cd backend
npm start
```

The API runs at `http://localhost:5000` by default.

Start the frontend in a second terminal:

```powershell
cd frontend
npm run dev
```

Vite prints the local frontend URL, normally `http://localhost:5173`. The frontend expects the backend API at `http://localhost:5000/api`.

For backend development with automatic restarts:

```powershell
cd backend
npm run dev
```

## API Routes

All routes are prefixed with `http://localhost:5000/api`.

| Resource | Routes |
| --- | --- |
| Passengers | `GET/POST /passengers`, `GET/PUT/DELETE /passengers/:id` |
| Trains | `GET/POST /trains`, `GET/PUT/DELETE /trains/:id`, `GET /trains/search` |
| Schedules | `GET/POST /schedule`, `GET /schedule/:id`, `GET /schedule/train/:trainNo` |
| Tickets | `POST /tickets/book`, `GET /tickets/:id`, `PUT /tickets/cancel/:id` |
| Payments | `POST /payments` |
| Stations | `GET/POST /stations` |
| Dashboard | `GET /dashboard` |

## Production Build

Create a production frontend bundle with:

```powershell
cd frontend
npm run build
```

Preview the bundle locally with:

```powershell
npm run preview
```

## Notes

- Keep `backend/.env` private. It is excluded from Git by `backend/.gitignore`.
- The frontend API base URL is currently defined in `frontend/src/services/api.js`.
- `backend/sql/schema.sql` contains sample data and can be adjusted before loading it into a new database.