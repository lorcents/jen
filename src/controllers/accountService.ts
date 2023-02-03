import express from "express"

import { AccountService } from "../services/accountService";


export const accountService = {
  checkBalance: async (req :express.Request, res:express.Response) => {
    const data = {
      countryCode: "KE",
      accountNumber: "1450160649886",
    };
    const response = await AccountService.getBalance(data);
    res.json(response);
  },
};
