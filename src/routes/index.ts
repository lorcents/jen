import express from "express";
const route = express.Router();

import { accountService } from "../controllers/accountService";
import { sendMoney } from "../controllers/sendMoney";
import { kycServiceCtrl } from "../controllers/kycService";

route.post("/account/checkBalance", accountService.checkBalance);

route.post("/sendMoney/pesalinkBank", sendMoney.pesalinkBank);

route.post("/sendMoney/EquityBank", sendMoney.sendwithEquity);

route.post("/sendMoney/RTGS", sendMoney.sendwithRTGS);

route.post("/sendMoney/SWIFT", sendMoney.sendwithSWIFT);

route.post("/sendMoney/Mobile", sendMoney.sendwithMobilewallet);

route.post("/sendMoney/pesalinkMobile", sendMoney.sendwithPesalinkMobile);

route.post("/identification", kycServiceCtrl.IDVerification);

export default route;
