import "dotenv/config";
import { OpenAI } from "openai";

const client = new OpenAI();

// Persona definitions
const personas = {
  hitesh: {
    id: "hitesh",
    name: "Hitesh Choudhary",
    title: "Tech Educator & Entrepreneur",
    bio: "Passionate about teaching programming with a focus on practical knowledge and real-world applications.",
    avatar: "https://github.com/hiteshchoudhary.png",
    specialties: ["JavaScript", "Python", "Web Development", "DSA", "AI"],
    style: {
      voice:
        "Hanji! Hamesha Hindi mein baat karte hain, thoda mazaak, thodi chai aur bhot saara code. Funny tone ke saath har baat relatable hoti hai.",
      traits: [
        "funny",
        "relatable",
        "chai-lover",
        "inspirational",
        "desi techie",
      ],
    },
    tunes: [
      "Hanji! Unboxing ho gayi h guys 😁 Bhut mehnat lagti h is T-shirt ke liye!",
      "Chai aur code, bs isi mein zindagi set hai ☕💻",
      "Hum padha rhe hain, aap padh lo... chai pe milte rahenge 😄",
      "Full stack Data Science cohort start ho rha h bhai, live class me milte h 🔥",
      "Code karo, chill karo, lekin pehle chai lao ☕😎",
    ],
    genAICourse: {
      promoteLine:
        "Hanji! Gen AI course le lo bhai, aapke liye banaya h specially. Live class me chill aur coding dono milegi ☕🔥",
      courseLink: "https://chaicode.dev/genai",
      examples: [
        "Hanji bhai, Gen AI course abhi le lo, warna regret karega later! 🤖💥",
        "AI seekhna hai? Chai leke aao aur iss course me ghus jao 😎☕",
      ],
    },
  },
  piyush: {
    id: "piyush",
    name: "Piyush Garg",
    title: "Educator & Content Creator",
    bio: "Content creator, educator, and entrepreneur known for his expertise in the tech industry.",
    avatar: "https://github.com/piyushgarg-dev.png",
    specialties: ["Docker", "React", "Node.js", "Gen Ai", "Career Advice"],
    style: {
      voice:
        "Dekho bhai! Full-on desi swag ke saath, sab kuch Hindi mein samjhate hain, funny emojis ke saath. Straightforward + mazedaar!",
      traits: [
        "funny",
        "straight-shooter",
        "relatable",
        "energetic",
        "mentor-type",
      ],
    },
    tunes: [
      "Dekho bhai, Docker seekh lo, coupon DOCKERPRO use karo 🤓🔥",
      "Bhai, great work man! 🔥🔥",
      "Patila wale log dhyaan se suno, backend ka concept clear karo 😎💻",
      "System design ka dar khatam, bhai coding se pyaar badhao 🧠❤️",
      "Dekho bhai, DSA nhi seekha to internship me dukh hoga 😭",
    ],
    genAICourse: {
      promoteLine:
        "Dekho bhai, Gen AI ka course le lo. Puri life set ho jayegi. Hitesh bhai ke saath LIVE aane ka mauka bhi milega! 😎🔥",
      courseLink: "https://chaicode.dev/genai",
      examples: [
        "Dekho bhai, Gen AI abhi lena h to lo, warna FOMO ho jayega 🤖🧠🔥",
        "Bhai, Gen AI course liya? Nahi? Patila miss kar raha tu 😂💥",
      ],
    },
  },
};

// Create system prompt for selected persona
function createPersonaPrompt(persona) {
  return `
    You are ${persona.name}, a ${persona.title}.
    
    Bio: ${persona.bio}
    
    Your Specialties: ${persona.specialties.join(", ")}
    
    Your Communication Style:
    Voice: ${persona.style.voice}
    Personality Traits: ${persona.style.traits.join(", ")}
    
    Your Catchphrases (use these naturally in conversation):
    ${persona.tunes.map((tune) => `- ${tune}`).join("\n    ")}
    
    Course Promotion:
    - When appropriate, promote the Gen AI course: ${
      persona.genAICourse.promoteLine
    }
    - Course Link: ${persona.genAICourse.courseLink}
    - Use these promotion examples naturally: ${persona.genAICourse.examples.join(
      " | "
    )}
    
    Instructions:
    1. Always respond in character as ${persona.name}
    2. Use Hindi-English mix (Hinglish) as per your style
    3. Be funny, relatable, and engaging
    4. Use emojis appropriately
    5. Occasionally mention your catchphrases naturally
    6. When talking about coding/tech topics, promote the Gen AI course when relevant
    7. Be helpful and educational while maintaining your personality
    8. Address the user as "bhai" or similar friendly terms
    9. Keep responses concise but engaging (max 200 words)
    
    Remember: You are ${
      persona.name
    }, stay in character throughout the conversation!
  `;
}

// API Controller Class
class PersonaController {
  // GET /api/personas - Get all available personas
  static async getAllPersonas(req, res) {
    try {
      const personaList = Object.values(personas).map((persona) => ({
        id: persona.id,
        name: persona.name,
        title: persona.title,
        bio: persona.bio,
        avatar: persona.avatar,
        specialties: persona.specialties,
        traits: persona.style.traits,
      }));

      res.status(200).json({
        success: true,
        message: "Personas fetched successfully",
        data: personaList,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error fetching personas",
        error: error.message,
      });
    }
  }

  // GET /api/personas/:personaId - Get specific persona details
  static async getPersonaById(req, res) {
    try {
      const { personaId } = req.params;
      const persona = personas[personaId];

      if (!persona) {
        return res.status(404).json({
          success: false,
          message: "Persona not found",
        });
      }

      res.status(200).json({
        success: true,
        message: "Persona fetched successfully",
        data: persona,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error fetching persona",
        error: error.message,
      });
    }
  }

  // POST /api/chat - Chat with selected persona
  static async chatWithPersona(req, res) {
    try {
      const { personaId, message, chatHistory = [] } = req.body;

      // Validation
      if (!personaId || !message) {
        return res.status(400).json({
          success: false,
          message: "personaId and message are required",
        });
      }

      const persona = personas[personaId];
      if (!persona) {
        return res.status(404).json({
          success: false,
          message: "Persona not found",
        });
      }

      // Build messages array with chat history
      const messages = [
        {
          role: "system",
          content: createPersonaPrompt(persona),
        },
      ];

      // Add chat history (last 10 messages to manage token limits)
      const recentHistory = chatHistory.slice(-10);
      messages.push(...recentHistory);

      // Add current user message
      messages.push({
        role: "user",
        content: message,
      });

      // Get AI response
      const response = await client.chat.completions.create({
        model: "gpt-4o-mini",
        messages: messages,
        temperature: 0.8,
        max_tokens: 300,
        presence_penalty: 0.6,
        frequency_penalty: 0.3,
      });

      const aiResponse = response.choices[0].message.content;

      res.status(200).json({
        success: true,
        message: "Chat response generated successfully",
        data: {
          persona: {
            id: persona.id,
            name: persona.name,
            avatar: persona.avatar,
          },
          response: aiResponse,
          timestamp: new Date().toISOString(),
        },
      });
    } catch (error) {
      console.error("Chat error:", error);
      res.status(500).json({
        success: false,
        message: "Error generating chat response",
        error: error.message,
      });
    }
  }

  // POST /api/chat/quick - Quick single message chat (no history)
  static async quickChat(req, res) {
    try {
      const { personaId, message } = req.body;

      if (!personaId || !message) {
        return res.status(400).json({
          success: false,
          message: "personaId and message are required",
        });
      }

      const persona = personas[personaId];
      if (!persona) {
        return res.status(404).json({
          success: false,
          message: "Persona not found",
        });
      }

      const response = await client.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: createPersonaPrompt(persona),
          },
          {
            role: "user",
            content: message,
          },
        ],
        temperature: 0.8,
        max_tokens: 250,
      });

      res.status(200).json({
        success: true,
        message: "Quick chat response generated",
        data: {
          persona: {
            id: persona.id,
            name: persona.name,
            avatar: persona.avatar,
          },
          response: response.choices[0].message.content,
          timestamp: new Date().toISOString(),
        },
      });
    } catch (error) {
      console.error("Quick chat error:", error);
      res.status(500).json({
        success: false,
        message: "Error in quick chat",
        error: error.message,
      });
    }
  }

  // GET /api/health - Health check endpoint
  static async healthCheck(req, res) {
    res.status(200).json({
      success: true,
      message: "AI Persona API is running",
      timestamp: new Date().toISOString(),
      availablePersonas: Object.keys(personas),
    });
  }
}

export default PersonaController;
