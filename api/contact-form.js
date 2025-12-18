import { connectDB } from "../lib/db.js";
import ContactForm from "../model/ContactForm.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Only POST allowed" });
  }

  try {
    await connectDB();
    const newEntry = new ContactForm(req.body);
    await newEntry.save();

    res.status(200).json({ success: true, message: "✅ Form saved to MongoDB" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "❌ Failed to save form" });
  }
}


