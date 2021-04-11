/*
  fn para generar y verificar la firma del token
*/
import jwt from "jsonwebtoken";
import path from "path";
import fs from "fs";

// import private and public key
const key = fs.readFileSync(path.join(__dirname, "../keys/private.pem"));
const cert = fs.readFileSync(path.join(__dirname, "../keys/public.pem"));
const options = { expiresIn: "6h", algorithm: "RS256" };

// create token with private key
export const sign = (payload) => jwt.sign(payload, key, options);

// verify token with public key
export const verify = (token) => jwt.verify(token, cert);
