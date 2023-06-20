"use strict";
const Path = require("path");
const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory } = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const Errors = require("../api/errors/cash-receipt-error.js");
const AppClient = require("uu_appg01_server").AppClient
const Ingredience = require("../abl/ingredience-abl.js");

const WARNINGS = {

};

class CashReceiptAbl {

  constructor() {
    this.validator = Validator.load();
    this.dao = DaoFactory.getDao("cashReceipt");
    this.ing = DaoFactory.getDao("ingredience");
  }

  async find(awid, dtoIn) {
    let uuAppErrorMap = {};
    let validationResult = this.validator.validate("cashReceiptDtoInType", dtoIn);

    // write to uuAppErrorMap result of validation
    uuAppErrorMap = ValidationHelper.processValidationResult(dtoIn, validationResult, Errors.Find.InvalidDtoIn);


    let cashReceiptIngredience = []
    let ekasaUrl = "https://ekasa.financnasprava.sk/mdu/api/v1/opd/receipt/find";
    // let ekasaDtoIn = {receiptId:"O-AC6D5656CDC64336AD5656CDC60336E0"};
    let cashReceipt = await AppClient.post(ekasaUrl,dtoIn);
    cashReceipt = cashReceipt.data.receipt.items;
    for(let i = 0; i < cashReceipt.length; i++) {

      let ingredience = await Ingredience.get(awid, {cashReceiptName: cashReceipt[i].name});

      if (ingredience.itemList[0]) {

        ingredience.itemList[0].quantity = cashReceipt[i].quantity;
        console.log(ingredience.itemList[0].name);
        cashReceiptIngredience.push({name: ingredience.itemList[0].name,id: ingredience.itemList[0].id, amount: ingredience.itemList[0].cashReceiptAmount * cashReceipt[i].quantity})

      }
    }
    if(!cashReceipt){

      throw new Errors.Find.CashReceiptDaoFindFailed({ uuAppErrorMap }, { recepitId: dtoIn.receiptId });

    }
    return  cashReceiptIngredience;
  }

}

module.exports = new CashReceiptAbl();
