"use strict";

const Model = use("Model");
const Hash = use("Hash");
const uuidv4 = require("uuid/v4");

class User extends Model {
  static get primaryKey() {
    return "id";
  }

  static get incrementing() {
    return false;
  }

  static boot() {
    super.boot();

    this.addHook("beforeSave", async userInstance => {
      if (userInstance.dirty.password) {
        userInstance.password = await Hash.make(userInstance.password);
      }
    });

    this.addHook("beforeCreate", async userInstance => {
      userInstance.id = uuidv4();
    });
  }

  tokens() {
    return this.hasMany("App/Models/Token");
  }
}

module.exports = User;
