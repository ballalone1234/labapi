import { connection } from "@/lib/db";
import { getJWT } from "@/lib/auth";

export default function handler(req, res) {
  const db = connection;
  const { username, password } = req.body;
  if(req.method === "POST"){
    if (!username || !password) res.status(400).json({ message: "Please provide username and password" });
    db.query('SELECT * FROM users WHERE username = ? AND password = sha1(?)',
    [username, password], (error, result, fields) => {

      if (error) {
        res.status(500).json({ message: error.message });
      }
      if (!result[0]){
        res.status(404).json({ message: "Invalid credentials" });
      }

      const jwt = getJWT(username);
      res.status(200).json({ apikey: jwt });
    });
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}