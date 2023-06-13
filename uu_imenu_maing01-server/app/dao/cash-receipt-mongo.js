"use strict";
const { UuObjectDao } = require("uu_appg01_server").ObjectStore;

class CashReceiptMongo extends UuObjectDao {

  async createSchema(){
  }

}

module.exports = CashReceiptMongo;
