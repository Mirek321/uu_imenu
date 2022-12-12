"use strict";
const { UuObjectDao } = require("uu_appg01_server").ObjectStore;

class IngredienceMongo extends UuObjectDao {

  async createSchema() {
    await super.createIndex({ awid: 1 }, { unique: false });
  }
  async create(uuObject) {
    return await super.insertOne(uuObject);
  }

}

module.exports = IngredienceMongo;
