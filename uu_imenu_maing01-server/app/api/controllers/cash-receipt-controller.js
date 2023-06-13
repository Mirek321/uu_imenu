"use strict";
const CashReceiptAbl = require("../../abl/cash-receipt-abl.js");

class CashReceiptController {

  find(ucEnv) {
    return CashReceiptAbl.find(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

}

module.exports = new CashReceiptController();
