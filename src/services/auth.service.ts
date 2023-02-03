import axios from "axios";
import moment from "moment";

import { AuthOptions, AuthResponse } from "../interface/auth.interface";
import { url, config } from "../config";

export abstract class AuthService {
  static async getAuth(): Promise<AuthResponse> {
    const merchantCode = config.merchantCode!;
    const consumerSecret = config.consumerSecret!;
    const apiKey = config.ApiKey!;

    if (!merchantCode)
      throw new Error("Jenga! Please provide the merchant code");

    if (!consumerSecret)
      throw new Error("Jenga! Please provide the consumer secret");

    const response: AuthResponse = (
      await axios({
        method: "post",
        url: url.authUrl,
        data: {
          merchantCode,
          consumerSecret,
        },
        headers: {
          "Api-Key": apiKey,
        },
      })
    ).data;

    console.log("jenga-getAuth %o", response);

    const { expiresIn: expiresInText, issuedAt: issuedAtText } = response;

    return {
      ...response,
      ...{
        expiresIn: moment.utc(expiresInText).toDate(),
        issuedAt: moment.utc(issuedAtText).toDate(),
      },
    };
  }
}
