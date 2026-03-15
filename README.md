# Fullstack Todo App

## Project Overview

This project is a small fullstack todo application built for a developer assessment. It includes a React frontend and a NestJS backend, with basic CRUD functionality for creating and managing tasks.

The main goal of this project was to build a simple app with a clear structure and a working frontend-backend connection. I tried to keep the code easy to follow and focused on the core feature rather than adding extra complexity.

## Features

- Create a new todo
- View all todos
- Update a todo title
- Mark a todo as completed
- Delete a todo
- Show basic API validation and error handling
- Basic API rate limiting to prevent request abuse
- The input field is not cleared if a create request fails due to validation or conflict

## Tech Stack

### Frontend

- React
- TypeScript
- Vite
- Axios
- Tailwind CSS
- lucide-react

### Backend

- NestJS
- TypeScript
- class-validator
- class-transformer
- Jest

## Architecture

The project is split into two apps:

- `frontend/` for the user interface
- `backend/` for the REST API

At a high level, the frontend sends requests to the backend to load and update todo data. The backend handles validation and todo logic, then returns the result to the frontend.

On the frontend, the main page is in `frontend/src/pages/TodoPage.tsx`, and the todo state / API interaction is handled in `frontend/src/hooks/useTodos.ts`.

On the backend, the todo feature is organized inside `backend/src/todos/`, with a controller for routes, a service for logic, and DTOs for request validation.

A simple global rate limiting strategy is applied to protect the API from excessive requests. 
This is intentionally lightweight but demonstrates awareness of basic backend security practices.

## How to Run Backend

```bash
cd backend
npm install
npm run start:dev
```

The backend runs on `http://localhost:5000`.

## How to Run Frontend

Create a `.env` file inside `frontend/`:

```bash
VITE_API_URL=http://localhost:5000
```

Then run:

```bash
cd frontend
npm install
npm run dev
```

The frontend usually runs on `http://localhost:5173`.

## Environment Variables

### Frontend

| Variable | Required | Example |
| --- | --- | --- |
| `VITE_API_URL` | Yes | `http://localhost:5000` |

### Backend

The backend does not currently use environment variables. The port is hardcoded in `backend/src/main.ts`.

## API Endpoints

Base URL: `http://localhost:5000`

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/todos` | Get all todos |
| `GET` | `/todos/:id` | Get one todo by ID |
| `POST` | `/todos` | Create a todo |
| `PATCH` | `/todos/:id` | Update a todo |
| `DELETE` | `/todos/:id` | Delete a todo |

## Validation Summary

Validation is handled in the backend using DTOs and NestJS validation.

- `title` is required when creating a todo
- `title` must be a string and cannot be empty
- `title` is trimmed and limited to 100 characters
- `isCompleted` must be a boolean when provided
- extra unexpected fields are rejected
- todo IDs must be numeric
- duplicate todo titles are not allowed
- API returns a conflict error when attempting to create or update a todo with a duplicate title

## Known Limitations

- Todo data is stored in memory, so it resets when the backend restarts
- There is no database yet
- Backend configuration is minimal and the port is hardcoded
- Test coverage is still basic
- Error handling on the frontend is simple and could be improved

## Future Improvements

- Add database persistence
- Move backend config into environment variables
- Improve test coverage
- Improve error handling consistency
- Add filtering or search for todos
- Improve loading, empty, and error states in the UI

## Reflection / Learning

One important tradeoff in this project is the use of in-memory storage instead of a database. 
I chose this approach to keep the scope aligned with the assessment requirements and focus on API structure, validation, and frontend-backend integration.

If this project were extended further, the next priorities would be persistence, stronger automated tests, and improved API consistency.