/*
  fn para generar y verificar la firma del token
*/
import jwt from "jsonwebtoken";
import path from "path";
import fs from "fs";

// import private and public key
const privateKey = fs.readFileSync(path.join(__dirname, "./keys/private.pem"));
const publicKey = fs.readFileSync(path.join(__dirname, "./keys/public.pem"));

// token create
export const sign = (payload) => {
  return jwt.sign(payload, privateKey, { expiresIn: "6h", algorithm: "RS256" });
};

// verify token
export const verify = (token) => {
  return jwt.verify(token, publicKey);
};
