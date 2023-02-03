import express from "express";

import { kycService } from "../services/kyc.service";

export const kycServiceCtrl = {
  IDVerification: async (req: express.Request, res: express.Response) => {
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
    const response = await kycService.IDVerification(data);
    res.json(response);
  },
};
