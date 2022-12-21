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
  async get(awid, id) {
    return await super.findOne({ awid, id });
  }
  async delete(awid, id) {
    return await super.deleteOne({ awid, id });
  }
}

module.exports = RecipeMongo;
