import { connectDB } from "../lib/db.js";
import mongoose from "mongoose";

const VisitSchema = new mongoose.Schema({

   ip: String,
  browser: String,
  os: String,
  device: String,
  referrer: String,
  url: String,
  sessionId: String,
  isReturning: Boolean,
  visitedAt: {
    type: Date,
    default: Date.now
  }
  // path: String,
  // ip: String,
  // userAgent: String,
  // time : String,
  // timestamp: { type: Date, default: Date.now }
});

const Visit =
  mongoose.models.Visit || mongoose.model("Visit", VisitSchema);

export default async function handler(req, res) {
   // cors
   res.setHeader(
    "Access-Control-Allow-Origin",
    "https://aditienterprises.vercel.app"
  );
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Preflight
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Only POST allowed" });
  }

  
  try {
    await connectDB();

    const visit = new Visit({
      // path: req.body.path,
      // ip: req.headers["x-forwarded-for"] || req.socket.remoteAddress,
      // userAgent: req.headers["user-agent"]
      ip: req.headers["x-forwarded-for"] || req.socket.remoteAddress,
      browser: agent.browser,
      os: agent.os,
      device: agent.isMobile ? "Mobile" : "Desktop",
      referrer: req.headers.referer || "Direct",
      url: req.originalUrl,
      sessionId,
      isReturning: !!req.headers.cookie
    });

    await visit.save();
    res.status(200).json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false });
  }
}
