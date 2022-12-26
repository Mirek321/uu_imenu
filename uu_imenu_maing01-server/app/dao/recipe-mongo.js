"use strict";
const { UuObjectDao } = require("uu_appg01_server").ObjectStore;
//aaaa
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
  async load(awid, id) {
    return await super.findOne({ awid, id });
  }
  async delete(awid, id) {
    return await super.deleteOne({ awid, id });
  }

  async update(uuObject) {
    let filter = {
      awid: uuObject.awid,
      id: uuObject.id,
    };
    return await super.findOneAndUpdate(filter, uuObject, "NONE");
  }
  async list(awid) {
    return await super.find({ awid });
  }
}

module.exports = RecipeMongo;
