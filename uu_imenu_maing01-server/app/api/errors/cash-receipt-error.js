"use strict";

const ImenuMainUseCaseError = require("./imenu-main-use-case-error.js");
const CASH_RECEIPT_ERROR_PREFIX = `${ImenuMainUseCaseError.ERROR_PREFIX}cashReceipt/`;

const Find = {
  UC_CODE: `${CASH_RECEIPT_ERROR_PREFIX}find/`,
  
};

module.exports = {
  Find
};
