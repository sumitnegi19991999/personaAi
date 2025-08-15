import "dotenv/config";
import express from "express";
import cors from "cors";
import personaRoutes from "./routes/personaRoutes.js";

const app = express();

// Configure CORS via environment (comma-separated list) or allow all by default
const corsOptions = process.env.CORS_ORIGIN
  ? { origin: process.env.CORS_ORIGIN.split(",").map((o) => o.trim()) }
  : {};
app.use(cors(corsOptions));
app.use(express.json());

// Health check endpoint for Railway
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok", timestamp: new Date().toISOString() });
});

app.use("/api", personaRoutes);

const PORT = process.env.PORT || 10000;
if (!process.env.OPENAI_API_KEY) {
  console.warn(
    "Warning: OPENAI_API_KEY is not set. Persona chat endpoints will fail until it is configured."
  );
}
app.listen(PORT, () => {
  console.log(`AI Persona API running on port ${PORT}`);
});
