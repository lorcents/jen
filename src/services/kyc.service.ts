import axios from "axios";
import moment from "moment";

import { SignatureService } from "./signature.service";
import { AuthService } from "./auth.service";

import { url } from "../config";

export abstract class kycService {
  static async IDVerification(data: {
    identity: {
      documentType: string;
      firstName: string;
      lastName: string;
      dateOfBirth: string;
      documentNumber: string;
      countryCode: string;
    };
  }): Promise<any> {
    const {
      identity: {
        documentNumber,
        dateOfBirth,
        documentType,
        firstName,
        lastName,
        countryCode,
      },
    } = data;

    const signature = SignatureService.getSignature(
      `${countryCode}${documentNumber}`
    );

    const kycIdUrl = url.kycIdUrl!;
    const { accessToken } = await AuthService.getAuth();

    const response: any = (
      await axios({
        method: "post",
        url: kycIdUrl,
        headers: {
          Authorization: `Bearer ${accessToken}`,
          signature: signature,
          "Content-Type": "application/json",
        },
        data: data,
      })
    ).data;

    console.log("jenga-getBalance %o", response);

    return response;
  }
}
