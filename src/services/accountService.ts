import axios from "axios";
import { SignatureService } from "./signature.service";
import { AuthService } from "./auth.service";

import { url } from "../config";

export abstract class AccountService {
  static async getBalance(data: {
    countryCode: string;
    accountNumber: string;
  }): Promise<any> {
    const { countryCode, accountNumber } = data;

    const signature = SignatureService.getSignature(
      `${countryCode}${accountNumber}`
    );

    const { accessToken } = await AuthService.getAuth();

    const response: any = (
      await axios({
        method: "get",
        url: `${url.accBalUrl}/${countryCode}/${accountNumber}`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
          signature: signature,
          "Content-Type": "application/json",
        },
      })
    ).data;

    console.log("jenga-getBalance %o", response);

    return response;
  }
}
