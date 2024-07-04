const jwt = require("jsonwebtoken");
require("dotenv").config();

const auth = (req, res, next) => {
  const header = req.headers.authorization;
  if (header) {
    const token = header.split(" ")[1];
    const secret_key = process.env.JWT_SECRET;
    jwt.verify(token, secret_key, (err, decode) => {
      if (err) {
        console.log(err);
        res.sendStatus(400);
      } else {
        req.user = decode;
        next();
      }
    });
  } else res.status(400).send("Token not found");
};

module.exports = auth;
