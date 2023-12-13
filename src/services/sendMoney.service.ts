import axios from "axios";
import moment from "moment";

import { url } from "../config";
import { AuthService } from "./auth.service";
import { SignatureService } from "./signature.service";

export abstract class SendMoneyService {
  //Send Money with PesaLink to Bank Account
  static async sendMoneyPesaLinkToBankAccount(data: {
    source: {
      countryCode: string;
      name: string;
      accountNumber: string;
    };
    destination: {
      type: string;
      countryCode: string;
      name: string;
      bankCode: string;
      accountNumber: string;
    };
    transfer: {
      type: string;
      amount: string;
      currencyCode: string;
      reference: string;
      date: Date;
      description: string;
    };
  }): Promise<any> {
    const {
      source: { accountNumber },
      destination: { name: destinationName },
      transfer: { amount, reference, date: dateToFormat, currencyCode },
    } = data;

    const date = moment.utc(dateToFormat).format("YYYY-MM-DD");

    const signature = SignatureService.getSignature(
      `${amount}${currencyCode}${reference}${destinationName}${accountNumber}`
    );

    const { accessToken } = await AuthService.getAccessToken();

    const response: any = (
      await axios({
        method: "post",
        url: url.sendMoneyPesalinkBankUrl,
        headers: {
          Authorization: `Bearer ${accessToken}`,
          signature: signature,
          "Content-Type": "application/json",
        },
        data: {
          ...data,
          ...{ transfer: { ...data.transfer, ...{ date } } },
        },
      })
    ).data;

    console.log("jenga-sendMoneyPesaLink %o", response);

    return response;
  }
  static async sendMoneyWithinEquityBank(data: {
    source: {
      countryCode: string;
      name: string;
      accountNumber: string;
    };
    destination: {
      type: string;
      countryCode: string;
      name: string;
      accountNumber: string;
    };
    transfer: {
      type: string;
      amount: string;
      currencyCode: string;
      reference: string;
      date: Date;
      description: string;
    };
  }): Promise<any> {
    const {
      source: { accountNumber },
      transfer: { amount, currencyCode, reference, date: dateToFormat },
    } = data;

    const date = moment.utc(dateToFormat).format("YYYY-MM-DD");
    const sendMoneyEquityUrl = url.sendMoneyEquityUrl!;

    const signature = SignatureService.getSignature(
      `${accountNumber}${amount}${currencyCode}${reference}`
    );

    const { accessToken } = await AuthService.getAccessToken();

    const response: any = (
      await axios({
        method: "post",
        url: sendMoneyEquityUrl,
        headers: {
          Authorization: `Bearer ${accessToken}`,
          signature: signature,
          "Content-Type": "application/json",
        },
        data: {
          ...data,
          ...{ transfer: { ...data.transfer, ...{ date } } },
        },
      })
    ).data;

    console.log("jenga-sendMoneyWithinEquityBank %o", response);

    return response;
  }

  //send Money with RTGS

  static async sendMoneyRTGS(data: {
    source: {
      countryCode: string;
      name: string;
      accountNumber: string;
      currency: string;
    };
    destination: {
      type: string;
      countryCode: string;
      name: string;
      bankCode: string;
      accountNumber: string;
    };
    transfer: {
      type: string;
      amount: string;
      currencyCode: string;
      reference: string;
      date: Date;
      description: string;
    };
  }): Promise<any> {
    const {
      source: { accountNumber },
      destination: { accountNumber: destinationAccountNumber },
      transfer: { amount, reference, date: dateToFormat },
    } = data;

    const date = moment.utc(dateToFormat).format("YYYY-MM-DD");
    const sendMoneyRTGSUrl = url.sendMoneyRTGSUrl!;

    const signature = SignatureService.getSignature(
      `${reference}${date}${accountNumber}${destinationAccountNumber}${amount}`
    );

    const { accessToken } = await AuthService.getAccessToken();

    const response: any = (
      await axios({
        method: "post",
        url: sendMoneyRTGSUrl,
        headers: {
          Authorization: `Bearer ${accessToken}`,
          signature: signature,
          "Content-Type": "application/json",
        },
        data: {
          ...data,
          ...{ transfer: { ...data.transfer, ...{ date } } },
        },
      })
    ).data;

    console.log("jenga-sendMoneyRTGS %o", response);

    return response;
  }

  //sendMoney with SWIFT

  static async sendMoneySWIFT(data: {
    source: {
      countryCode: string;
      name: string;
      accountNumber: string;
      sourceCurrency: string;
    };
    destination: {
      type: string;
      countryCode: string;
      name: string;
      bankBic: string;
      accountNumber: string;
      addressline1: string;
      currency: string;
    };
    transfer: {
      type: string;
      amount: string;
      currencyCode: string;
      reference: string;
      date: Date;
      description: string;
      chargeOption: string;
    };
  }): Promise<any> {
    const {
      source: { accountNumber },
      destination: { accountNumber: destinationAccountNumber },
      transfer: { amount, reference, date: dateToFormat },
    } = data;

    const date = moment.utc(dateToFormat).format("YYYY-MM-DD");
    const sendMoneySwiftUrl = url.sendMoneySwiftUrl!;

    const signature = SignatureService.getSignature(
      `${reference}${date}${accountNumber}${destinationAccountNumber}${amount}`
    );

    const { accessToken } = await AuthService.getAccessToken();

    const response: any = (
      await axios({
        method: "post",
        url: sendMoneySwiftUrl,
        headers: {
          Authorization: `Bearer ${accessToken}`,
          signature: signature,
          "Content-Type": "application/json",
        },
        data: {
          ...data,
          ...{ transfer: { ...data.transfer, ...{ date } } },
        },
      })
    ).data;

    console.log("jenga-sendMoneySWIFT %o", response);

    return response;
  }

  static async sendToMobileWallet(data: {
    source: {
      countryCode: string;
      name: string;
      accountNumber: string;
    };
    destination: {
      type: string;
      countryCode: string;
      name: string;
      mobileNumber: string;
      walletName: string;
    };
    transfer: {
      type: string;
      amount: string;
      currencyCode: string;
      reference: string;
      date: Date;
      description: string;
    };
  }): Promise<any> {
    const {
      source: { accountNumber },
      destination: { walletName },
      transfer: { amount, currencyCode, reference, date: dateToFormat },
    } = data;

    const date = moment.utc(dateToFormat).format("YYYY-MM-DD");
    const sendMoneyMobileUrl = url.sendMoneyMobileUrl!;

    const signature = SignatureService.getSignature(
      walletName === "Equitel"
        ? `${amount}${currencyCode}${reference}${accountNumber}`
        : `${accountNumber}${amount}${currencyCode}${reference}`
    );

    const { accessToken } = await AuthService.getAccessToken();

    const rawResponse: Record<string, unknown> = (
      await axios({
        method: "post",
        url: sendMoneyMobileUrl,
        headers: {
          Authorization: `Bearer ${accessToken}`,
          signature: signature,
          "Content-Type": "application/json",
        },
        data: {
          ...data,
          ...{ transfer: { ...data.transfer, ...{ date } } },
        },
      })
    ).data;

    rawResponse["transactionId"] = rawResponse["transactionId "];

    delete rawResponse["transactionId "];

    const response: any = rawResponse;

    console.log("jenga-sendMoneyToMobileWallet %o", response);

    return response;
  }

  static async sendMoneyPesaLinkToMobileNumber(data: {
    source: {
      countryCode: string;
      name: string;
      accountNumber: string;
    };
    destination: {
      type: string;
      countryCode: string;
      name: string;
      bankCode: string;
      accountNumber:string;
      mobileNumber: string;
    };
    transfer: {
      type: string;
      amount: string;
      currencyCode: string;
      reference: string;
      date: Date;
      description: string;
    };
  }): Promise<any> {
    const {
      source: { accountNumber },
      destination: { name: destinationName },
      transfer: { amount, reference, date: dateToFormat, currencyCode },
    } = data;

    const date = moment.utc(dateToFormat).format("YYYY-MM-DD");
    const sendMoneyPesalinkMobileUrl = url.sendMoneyPesalinkMobileUrl!;

    const signature = SignatureService.getSignature(
      `${amount}${currencyCode}${reference}${destinationName}${accountNumber}`
    );

    const { accessToken } = await AuthService.getAccessToken();

    const response: any = (
      await axios({
        method: "post",
        url: sendMoneyPesalinkMobileUrl,
        headers: {
          Authorization: `Bearer ${accessToken}`,
          signature: signature,
          "Content-Type": "application/json",
        },
        data: {
          ...data,
          ...{ transfer: { ...data.transfer, ...{ date } } },
        },
      })
    ).data;

    console.log("jenga-sendMoneyPesaLink %o", response);

    return response;
  }
}
