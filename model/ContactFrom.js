import mongoose from "mongoose";

const ContactFormSchema = new mongoose.Schema({
  name: String,
  mobile_no: String,
  email: String,
  address: String,
  message: String,
  timestamp: { type: Date, default: Date.now },
});

export default mongoose.model.ContactForm ||
  mongoose.model("ContactForm", ContactFormSchema);

