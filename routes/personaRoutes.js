import express from "express";
import PersonaController from "../controllers/personaController.js";

const router = express.Router();

// Routes
router.get("/health", PersonaController.healthCheck);
router.get("/personas", PersonaController.getAllPersonas);
router.get("/personas/:personaId", PersonaController.getPersonaById);
router.post("/chat", PersonaController.chatWithPersona);
router.post("/chat/quick", PersonaController.quickChat);

export default router;
