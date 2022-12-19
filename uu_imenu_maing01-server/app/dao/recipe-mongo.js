"use strict";
const { UuObjectDao } = require("uu_appg01_server").ObjectStore;

class RecipeMongo extends UuObjectDao {
  async createSchema() {
    await super.createIndex({ awid: 1 }, { unique: false });
    await super.createIndex({ id: 1 }, { unique: true });
  }
  async create(awid, dtoIn) {
    return await super.insertOne({ awid, ...dtoIn });
  }
}

module.exports = RecipeMongo;
