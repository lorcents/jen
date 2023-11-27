import express, { NextFunction } from "express";

import { kycService } from "../services/kyc.service";

export const kycServiceCtrl = {
  IDVerification: async (req: express.Request, res: express.Response, next : NextFunction) => {
    const data = {
      identity: {
        documentType: "ALIENID",
        firstName: "John",
        lastName: "Doe",
        dateOfBirth: "1999-01-21",
        documentNumber: "123456",
        countryCode: "KE",
      },
    };

    try{
    const response = await kycService.IDVerification(data);
    res.json(response);
    } catch(err){
      next(err)
    }
  },
};
