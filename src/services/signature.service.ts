import { readFileSync } from "fs";
import { sign, verify } from "crypto";

import path, { resolve } from "path";

export interface SignOptions {
  pathToPrivateKey?: string;
  pathToPublicKey?: string;
}

export abstract class SignatureService {
  static getSignature(data: string): string {
    const pathToPrivateKey = path.resolve("privatekey.pem");
    const privateKey = readFileSync(pathToPrivateKey);

    const signature = sign("sha256", Buffer.from(data), {
      key: privateKey,
    }).toString("base64");

    console.log("jenga-getSignature %o", signature);
    const pathToPublicKey = path.resolve("publickey.pem");
    const publicKey = readFileSync(pathToPublicKey);

    const isVerified = verify(
      "sha256",
      Buffer.from(data),
      {
        key: publicKey,
      },
      Buffer.from(signature, "base64")
    );

    console.log("jenga-getSignature verified %o", isVerified);

    return signature;
  }
}
