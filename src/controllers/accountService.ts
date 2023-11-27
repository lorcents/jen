import express from "express"

import { AccountService } from "../services/accountService";


export const accountService = {
  checkBalance: async (req :express.Request, res:express.Response, next :express.NextFunction) => {
    const data = {
      countryCode: "KE",
      accountNumber: "1215491395",
    };
    try {
    const response = await AccountService.getBalance(data);
    res.json(response);
    }catch(err){
next(err);
    }
  },
};
