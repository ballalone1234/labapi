import { checkApiKey } from "@/lib/auth";
import { connection } from "@/lib/db";

export default function handler(req, res) {
  const { category } = req.query;
  const db = connection;
  
  if (!checkApiKey(req)) res.status(401).json({ message: "Unauthorized" });

  if (req.method === "GET") {
    db.query(
      "SELECT * FROM products WHERE category = ?",
      [category],
      (err, results, fields) => {
        if (err) {
          res.status(500).json({ message: err.message });
          return;
        }
        res.status(200).json({ data: results });
        return;
      }
    );
  }  else {
    res.status(405).json({ message: "Method Not Allowed" });
    return;
  }
}
