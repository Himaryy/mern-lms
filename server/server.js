import cors from "cors";
import express from "express";
import "dotenv/config";
import db from "./configs/mongodb.js";
import { clerkWebhooks, stripeWebhooks } from "./controllers/webhooks.js";
import educatorRouter from "./routes/educator.route.js";
import { clerkMiddleware } from "@clerk/express";
import connectCloudinary from "./configs/cloudinary.js";
import courseRouter from "./routes/course.route.js";
import userRouter from "./routes/user.route.js";

// 90608

const app = express();

// Connect DB and CLoudinary
await db();
await connectCloudinary();

const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(clerkMiddleware());

// Routes
app.get("/", (req, res) => res.send("API WORKING"));
app.post("/clerk", express.json(), clerkWebhooks);

app.use("/api/educator", express.json(), educatorRouter);
app.use("/api/course", express.json(), courseRouter);
app.use("/api/user", express.json(), userRouter);

// Stripe Endpoint
app.use("/stripe", express.raw({ type: "application/json" }), stripeWebhooks);

app.listen(PORT, () => {
  console.log(`Server Running ${PORT}`);
});
