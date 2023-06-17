"use strict";

const ImenuMainUseCaseError = require("./imenu-main-use-case-error.js");
const CASH_RECEIPT_ERROR_PREFIX = `${ImenuMainUseCaseError.ERROR_PREFIX}cashReceipt/`;

const Find = {
  UC_CODE: `${CASH_RECEIPT_ERROR_PREFIX}find/`,
  CashReceiptDaoFindFailed: class extends ImenuMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Find.UC_CODE}CashReceiptDaoCreateFailed`;
      this.message = "Find CashReceipt by imenu DAO find failed.";
    }
  },
  InvalidDtoIn: class extends ImenuMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Find.UC_CODE}CashReceiptDaoCreateFailed`;
      this.message = "Find CashReceipt by imenu DAO find failed.";
    }
  },
};

module.exports = {
  Find
};
