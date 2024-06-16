import { checkApiKey } from "@/lib/auth";
import { connection } from "@/lib/db";

export default function handler(req, res) {
  const { id } = req.query;
  const db = connection;
  
  if (!checkApiKey(req)) res.status(401).json({ message: "Unauthorized" });

  if (req.method === "GET") {
    db.query(
      "SELECT * FROM products WHERE id = ?",
      [id],
      (err, results, fields) => {
        if (err) {
          res.status(500).json({ message: err.message });
          return;
        }
        res.status(200).json({ data: results });
        return;
      }
    );
  } else if (req.method === "PUT") {
    const { title, price, description, category, image } = req.body;

    // Validate required fields
    if (!title || !price || !description || !category || !image) {
      res.status(400).json({ message: "All fields are required" });
      return;
    }

    db.query(
      "UPDATE products SET title = ?, price = ?, description = ?, category = ?, image = ? WHERE id = ?",
      [title, price, description, category, image, id],
      (err, results, fields) => {
        if (err) {
          res.status(500).json({ message: err.message });
          return;
        }
        if (results.affectedRows === 0) {
          res.status(404).json({ message: "Product not found" });
          return;
        }
        res.status(200).json({ message: "Product updated successfully" });
        return;
      }
    );
  } else if (req.method === "DELETE") {
    db.query(
      "DELETE FROM products WHERE id = ?",
      [id],
      (err, results, fields) => {
        if (err) {
          res.status(500).json({ message: err.message });
          return;
        }
        if (results.affectedRows === 0) {
          res.status(404).json({ message: "Product not found" });
          return;
        }
        res.status(200).json({ message: "Product deleted successfully" });
        return;
      }
    );
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
    return;
  }
}
