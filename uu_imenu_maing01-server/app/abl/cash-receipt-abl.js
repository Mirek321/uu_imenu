"use strict";
const Path = require("path");
const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory } = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const Errors = require("../api/errors/cash-receipt-error.js");
const AppClient = require("uu_appg01_server").AppClient
const WARNINGS = {

};

class CashReceiptAbl {

  constructor() {
    this.validator = Validator.load();
    this.dao = DaoFactory.getDao("cashReceipt");
  }

  async find(awid, dtoIn) {


    let ekasaUrl = "https://ekasa.financnasprava.sk/mdu/api/v1/opd/receipt/find";
    let ekasaDtoIn = {receiptId:"O-AC6D5656CDC64336AD5656CDC60336E0"};
    let response = await AppClient.post(ekasaUrl,dtoIn);
    return response.data.receipt.items;
  }

}

module.exports = new CashReceiptAbl();
