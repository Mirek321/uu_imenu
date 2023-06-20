"use strict";
const { UuObjectDao } = require("uu_appg01_server").ObjectStore;
const ObjectID = require("mongodb").ObjectID;

class IngredienceMongo extends UuObjectDao {
  async createSchema() {
    await super.createIndex({ awid: 1 }, { unique: false });
    await super.createIndex({ id: 1 }, { unique: true });
  }
  async create(awid, dtoIn) {
    return await super.insertOne({ awid, ...dtoIn });
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
  async get(awid, dtoin) {
    if(dtoin.cashReceiptName){
      let cashReceiptName = dtoin.cashReceiptName;
      return await super.find({ awid, cashReceiptName});
    }
    if(dtoin.id){
      let id = dtoin.id;
      return await super.find({ awid, id});
    }

  }
  async load(awid, ingredienceIds) {
    let query = { awid };
    let listOfObjectIds = ingredienceIds.map((id) => ObjectID(id));
    query.id = { $in: listOfObjectIds };
    return await super.find(query);
  }
  async delete(awid, id) {
    return await super.deleteOne({ awid, id });
  }
}

module.exports = IngredienceMongo;
