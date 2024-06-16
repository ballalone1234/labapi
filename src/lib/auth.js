import jwt from "jsonwebtoken";

const KEY = "1101102";

const checkApiKey = (req) => {
  const apiKey = req.headers["apikey"] ;
  if (apiKey === KEY) return true;

  return false;
};

const getJWT = (username) => {
  return jwt.sign({ username: username }, KEY, { expiresIn: "1h" });
};

export { checkApiKey, getJWT };
