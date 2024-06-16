import { connection } from "@/lib/db";
import { getJWT } from "@/lib/auth";

export default function handler(req, res) {
  const db = connection;
  const { username, password } = req.body;
  if(req.method === "POST"){
    if (!username || !password) res.status(400).json({ message: "Please provide username and password" });
    db.query('SELECT * FROM users WHERE username = ? AND password = ?',
    [username, password], (error, result, fields) => {
      if (error) {
        res.status(500).json({ message: error.message });
      }
      if (!result[0]){
        res.status(404).json({ message: "Invalid credentials" });
      }
      console.log(result[0]);
      const jwt = getJWT(username);
      const data_result =[
        {
          code : 200,
          message : "Authorized",
          data : {
            username: result[0].username,
            email: result[0].email,
            role: result[0].role
          },
          token : jwt
        }
        
      ]
        res.status(200).json(data_result);
    });
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}