## Persona AI API

Simple Express API that serves persona-based chat endpoints powered by OpenAI.

### Requirements

- Node.js >= 18
- An OpenAI API key

### Getting Started

1. Clone the repo and install dependencies:

```bash
npm install
```

2. Create a `.env` file using `.env.example` as a reference:

```bash
cp .env.example .env
# then edit .env to add your values
```

3. Run the server:

```bash
npm run dev
# or
npm start
```

The server runs on `http://localhost:3000` by default.

### Environment Variables

- `PORT`: Port for the HTTP server (default: 3000)
- `CORS_ORIGIN`: Comma-separated list of allowed origins for CORS (e.g., `http://localhost:3000,http://localhost:5173`). Leave unset to allow all origins.
- `OPENAI_API_KEY`: Your OpenAI API key

### API

Base URL: `/api`

- `GET /api/health` — Health check
- `GET /api/personas` — List available personas
- `GET /api/personas/:personaId` — Get details of a specific persona
- `POST /api/chat` — Chat with a persona with optional `chatHistory`
- `POST /api/chat/quick` — Quick single-message chat

#### Example Requests

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

### Project Structure

```
controllers/
  personaController.js
routes/
  personaRoutes.js
server.js
```

This structure is fine for a small API. For growth, consider adding `middlewares/`, `services/`, and `tests/` directories.

### Notes

- CORS is configurable via `CORS_ORIGIN`.
- The OpenAI SDK reads `OPENAI_API_KEY` from the environment.
