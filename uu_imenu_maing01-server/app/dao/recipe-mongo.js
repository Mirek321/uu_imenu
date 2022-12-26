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
  async delete(awid, id) {
    return await super.deleteOne({ awid, id });
  }
  async generate(uuObject, pocet) {
    function isEmpty(object) {
      return Object.keys(object).length === 0;
    }
    if (isEmpty(uuObject) == false) {
      let filter = {};
      if (uuObject.category !== undefined) {
        filter.category = { $in: uuObject.category };
      }
      if (uuObject.type_recipe !== undefined) {
        filter.type_recipe = uuObject.type_recipe;
      }
      return await super.aggregate([{ $match: filter }, { $sample: { size: pocet } }]);
    } else {
      return await super.aggregate([{ $sample: { size: pocet } }]);
    }
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
