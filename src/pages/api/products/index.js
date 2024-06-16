import { checkApiKey } from "@/lib/auth";
import { connection } from "@/lib/db";

export default function handler(req, res) {
  const db = connection;

  if (!checkApiKey(req)) res.status(401).json({ message: "Unauthorized" });

  if (req.method === "POST") {
    const { id, title, price, description, category, image } = req.body;
    
    if (!id || !title || !price || !description || !category || !image) {
      res.status(400).json({ message: "All fields are required" });
      return;
    }

    db.query(
      "INSERT INTO `products`(`id`, `title`, `price`, `description`, `image`, `category`) VALUES (?, ?, ?, ?, ?, ?)",
      [id, title, price, description, image, category],
      (err, results, fields) => {
        if (err) {
          res.status(500).json({ message: err.message });
          return;
        }
        res.status(201).json({ data: results });
        return;
      }
    );
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
    return;
  }
}
