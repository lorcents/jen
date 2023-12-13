import axios from "axios";
import moment from "moment";

import { AuthOptions, AuthResponse } from "../interface/auth.interface";
import { url, config } from "../config";

export abstract class AuthService {
  private static accessTokenData = {
    accessToken :"",
    expiresIn: new Date(),
    issuedAt: new Date(),
    refreshToken:'',
    tokenType: ''
  }
  private static async getAuth(): Promise<AuthResponse> {
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

    this.accessTokenData = response

    return response;
  }

  public static async getAccessToken(): Promise<AuthResponse> {
    // Check if the token is expired or not set
    if (this.isTokenExpired()) {
      return await this.getAuth();
    } else {
      return this.accessTokenData;
    }
  }

  private static isTokenExpired(): boolean {
    return this.accessTokenData.expiresIn  < new Date();
  }
}
