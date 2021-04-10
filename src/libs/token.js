/*
  fn para generar y verificar la firma del token
*/
import jwt from "jsonwebtoken";
import fs from "fs";

// import private and public key
// const privateKey = fs.readFileSync("../keys/private.pem");
const publicKey = fs.readFileSync("../keys/public.pem");

// token create
export const sing = (payload) => {
  return jwt.sign(payload, privateKey, { expiresIn: "6h" });
};

// verify token
export const verify = (token) => {
  return jwt.verify(token, publicKey);
};
