"use strict";
const { UuObjectDao } = require("uu_appg01_server").ObjectStore;

class IngredienceMongo extends UuObjectDao {

  async createSchema() {
    await super.createIndex({ awid: 1 }, { unique: false });
    await super.createIndex({ id: 1 }, { unique: true });
  }
  async create(uuObject) {
    return await super.insertOne(uuObject);
  }

  async get(awid, id) {
    return await super.findOne({awid,id});
  }
}

module.exports = IngredienceMongo;
