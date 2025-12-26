import { connectDB } from "../lib/db.js";
import mongoose from "mongoose";

const VisitSchema = new mongoose.Schema({
  path: String,
  ip: String,
  userAgent: String,
  timestamp: { type: Date, default: Date.now }
});

const Visit =
  mongoose.models.Visit || mongoose.model("Visit", VisitSchema);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  try {
    await connectDB();

    const visit = new Visit({
      path: req.body.path,
      ip: req.headers["x-forwarded-for"] || req.socket.remoteAddress,
      userAgent: req.headers["user-agent"]
    });

    await visit.save();
    res.status(200).json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false });
  }
}
