import fs from "fs";
import path from "path";

export default function handler(req, res) {
  const htmlPath = path.join(process.cwd(), "templates", "about.html");
  const html = fs.readFileSync(htmlPath, "utf-8");

  res.setHeader("Content-Type", "text/html");
  res.status(200).send(html);
}
