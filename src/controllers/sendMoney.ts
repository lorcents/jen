import express, { NextFunction } from "express";

import { SendMoneyService } from "../services/sendMoney.service";

import { referenceFn } from "../util/reference";

export const sendMoney = {
  pesalinkBank: async (req: express.Request, res: express.Response,next :express.NextFunction) => {
    const ref = referenceFn(12);
    const data = {
      source: {
        countryCode: "KE",
        name: "John Doe",
        accountNumber: "1215491395",
      },
      destination: {
        type: "bank",
        countryCode: "KE",
        name: "Tom Doe",
        bankCode: "63",
        accountNumber: "0090207635001",
      },
      transfer: {
        type: "PesaLink",
        amount: "400.00",
        currencyCode: "KES",
        reference: ref,
        date: new Date(),
        description: "Some remarks here",
      },
    };

    try{
      const response = await SendMoneyService.sendMoneyPesaLinkToBankAccount(
        data
      );
  
      res.json(response);

    }catch(err){
      next(err);
    }
    
  },

  sendwithEquity: async (req: express.Request, res: express.Response, next:express.NextFunction) => {
    const ref = referenceFn(12);
    const data = {
      source: {
        countryCode: "KE",
        name: "John Doe",
        accountNumber: "1215491395",
      },
      destination: {
        type: "bank",
        countryCode: "KE",
        name: "Tom Doe",
        accountNumber: "0060161911111",
      },
      transfer: {
        type: "InternalFundsTransfer",
        amount: "100.00",
        currencyCode: "KES",
        reference: ref,
        date: new Date(),
        description: "Some remarks here",
      },
    };

    try{
      const response = await SendMoneyService.sendMoneyWithinEquityBank(data);

    res.json(response);
    }catch(err){
      next(err)
    }

    
  },

  sendwithRTGS: async (req: express.Request, res: express.Response, next:express.NextFunction) => {
    const ref = referenceFn(12);
    const data = {
      source: {
        countryCode: "KE",
        name: "John Doe",
        accountNumber: "1215491395",
        currency: "KES",
      },
      destination: {
        type: "bank",
        countryCode: "KE",
        name: "Tom Doe",
        bankCode: "70",
        accountNumber: "12365489",
      },
      transfer: {
        type: "RTGS",
        amount: "400.00",
        currencyCode: "KES",
        reference: ref,
        date: new Date(),
        description: "Some remarks here",
      },
    };

    try {
      const response = await SendMoneyService.sendMoneyRTGS(data);

      res.json(response);
    }catch(err){
      next(err);
    }

    
  },
  sendwithSWIFT: async (req: express.Request, res: express.Response,next:express.NextFunction) => {
    const ref = referenceFn(12);

    const data = {
      source: {
        countryCode: "KE",
        name: "John Doe",
        accountNumber: "1215491395",
        sourceCurrency: "KES",
      },
      destination: {
        type: "bank",
        countryCode: "JP",
        name: "Tom Doe",
        bankBic: "BOTKJPJTXXX",
        accountNumber: "12365489",
        addressline1: "Post Box 56",
        currency: "USD",
      },
      transfer: {
        type: "SWIFT",
        amount: "4.00",
        currencyCode: "USD",
        reference: ref,
        date: new Date(),
        description: "Some remarks here",
        chargeOption: "SELF",
      },
    };

    try {
      const response = await SendMoneyService.sendMoneySWIFT(data);

      res.json(response);
    }catch(err){
      next(err);
    }
   
  },

  sendwithMobilewallet: async (req: express.Request, res: express.Response,next:NextFunction) => {
    const reqBody = req.body;
    const ref = referenceFn(12);
    const data = {
      source: {
        countryCode: "KE",
        name: "John Doe",
        accountNumber: "1215491395",
      },
      destination: {
        type: "mobile",
        countryCode: "KE",
        name: "A N.Other",
        mobileNumber: "0740925341",
        walletName: "Mpesa",
      },
      transfer: {
        type: "MobileWallet",
        amount: "1000",
        currencyCode: "KES",
        reference: ref,
        date: new Date(),
        description: "some remarks here",
      },
    };

    try {
      const response = await SendMoneyService.sendToMobileWallet(data);

      res.json(response);
    }catch(err){
      next(err);
    }

    
  },

  sendwithPesalinkMobile: async (
    req: express.Request,
    res: express.Response,
    next:express.NextFunction
  ) => {
    const ref = referenceFn(12);
    const data = {
      source: {
        countryCode: "KE",
        name: "John Doe",
        accountNumber: "1215491395",
      },
      destination: {
        type: "mobile",
        countryCode: "KE",
        name: "Tom Doe",
        bankCode: "01",
        accountNumber: "1215491395",
        mobileNumber: "0722000000",
      },
      transfer: {
        type: "PesaLink",
        amount: "400.00",
        currencyCode: "KES",
        reference: ref,
        date: new Date(),
        description: "Some remarks here",
      },
    };
try{
  const response = await SendMoneyService.sendMoneyPesaLinkToMobileNumber(
    data
  );

  res.json(response);
}catch(err){
  next(err)
}
    
  },
};
