import cors from "cors";
import express from "express";
import "dotenv/config";
import db from "./configs/mongodb.js";
import { clerkWebhooks } from "./controllers/webhooks.js";

const app = express();

// Connect DB
await db();

const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());

// Routes
app.get("/", (req, res) => res.send("API WORKING"));
app.post("/clerk", express.json(), clerkWebhooks);

app.listen(PORT, () => {
  console.log(`Server Running ${PORT}`);
});
