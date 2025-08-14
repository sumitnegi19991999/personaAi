# Persona AI Chat Application

A full-stack AI persona chat application with Express backend and React frontend, powered by OpenAI.

## Project Structure

```
personaAi/
├── backend/           # Express API server
│   ├── controllers/
│   ├── routes/
│   ├── server.js
│   └── package.json
├── frontend/          # React Vite application
│   ├── src/
│   ├── public/
│   └── package.json
├── package.json       # Root package.json with scripts
└── README.md
```

## Requirements

- Node.js >= 18
- An OpenAI API key

## Quick Start

1. Clone the repo and install all dependencies:

```bash
npm run install:all
```

2. Create environment files:

```bash
# Backend environment
cp backend/.env.example backend/.env
# Edit backend/.env to add your OpenAI API key
```

3. Run the full application (both frontend and backend):

```bash
npm run dev
```

This will start:

- Backend API on `http://localhost:3000`
- Frontend on `http://localhost:5173`

## Individual Commands

### Backend Only

```bash
npm run dev:backend
# or
cd backend && npm run dev
```

### Frontend Only

```bash
npm run dev:frontend
# or
cd frontend && npm run dev
```

### Production

```bash
# Build frontend
npm run build

# Start backend
npm start
```

## Environment Variables

### Backend (.env)

- `PORT`: Port for the HTTP server (default: 3000)
- `CORS_ORIGIN`: Comma-separated list of allowed origins for CORS (e.g., `http://localhost:3000,http://localhost:5173`). Leave unset to allow all origins.
- `OPENAI_API_KEY`: Your OpenAI API key

## API Endpoints

Base URL: `http://localhost:3000/api`

- `GET /api/health` — Health check
- `GET /api/personas` — List available personas
- `GET /api/personas/:personaId` — Get details of a specific persona
- `POST /api/chat` — Chat with a persona with optional `chatHistory`
- `POST /api/chat/quick` — Quick single-message chat

### Example API Requests

```bash
curl http://localhost:3000/api/health
```

```bash
curl http://localhost:3000/api/personas
```

```bash
curl -X POST http://localhost:3000/api/chat/quick \
  -H 'Content-Type: application/json' \
  -d '{
    "personaId": "hitesh",
    "message": "Explain closures in JS in 2 lines"
  }'
```

```bash
curl -X POST http://localhost:3000/api/chat \
  -H 'Content-Type: application/json' \
  -d '{
    "personaId": "piyush",
    "message": "Help with Docker basics",
    "chatHistory": [
      {"role":"user","content":"Hi"},
      {"role":"assistant","content":"Hello!"}
    ]
  }'
```

## Available Personas

- **Hitesh Choudhary**: Tech Educator & Entrepreneur
- **Piyush Garg**: Educator & Content Creator

## Development

### Backend Development

- Express.js with ES modules
- OpenAI integration for chat responses
- CORS configuration
- Environment-based configuration

### Frontend Development

- React 18 with Vite
- Hot module replacement
- ESLint configuration
- Build optimization

## Notes

- CORS is configurable via `CORS_ORIGIN` environment variable
- The OpenAI SDK reads `OPENAI_API_KEY` from the environment
- Frontend runs on port 5173 by default (Vite)
- Backend runs on port 3000 by default
- Use `npm run dev` to run both simultaneously
