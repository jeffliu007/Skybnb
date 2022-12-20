"use strict";
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = "Users";
    return queryInterface.bulkInsert(
      options,
      [
        {
          email: "demo@user.io",
          username: "Demo-lition",
          hashedPassword: bcrypt.hashSync("password"),
          firstName: "Jonathan",
          lastName: "Wick",
        },
        {
          email: "ETGtheman@user.io",
          username: "EliThaGoat",
          hashedPassword: bcrypt.hashSync("password2"),
          firstName: "Eli",
          lastName: "Fanning",
        },
        {
          email: "AaronP@user.io",
          username: "AyyAyyRon",
          hashedPassword: bcrypt.hashSync("password3"),
          firstName: "Aaron",
          lastName: "Pike",
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = "Users";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      options,
      {
        username: { [Op.in]: ["Demo-lition", "FakeUser1", "FakeUser2"] },
      },
      {}
    );
  },
};
