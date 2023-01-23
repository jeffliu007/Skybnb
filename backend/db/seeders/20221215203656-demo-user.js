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
          username: "aaronThaMan",
          hashedPassword: bcrypt.hashSync("password3"),
          firstName: "Aaron",
          lastName: "Pike",
        },
        {
          email: "JohnG@user.io",
          username: "JGtester",
          hashedPassword: bcrypt.hashSync("password4"),
          firstName: "John",
          lastName: "Grand",
        },
        {
          email: "Brandon@user.io",
          username: "Brandontester",
          hashedPassword: bcrypt.hashSync("password5"),
          firstName: "Brandon",
          lastName: "Jinks",
        },
        {
          email: "Kyle@user.io",
          username: "Kyletester",
          hashedPassword: bcrypt.hashSync("password6"),
          firstName: "Kyle",
          lastName: "Feyvar",
        },
        {
          email: "EthanH@user.io",
          username: "Ethantester",
          hashedPassword: bcrypt.hashSync("password7"),
          firstName: "Ethan",
          lastName: "Hen",
        },
        {
          email: "salmon1@user.io",
          username: "salmon1tester",
          hashedPassword: bcrypt.hashSync("password8"),
          firstName: "Kevin",
          lastName: "Salmon",
        },
        {
          email: "LiamT@user.io",
          username: "Liamtester",
          hashedPassword: bcrypt.hashSync("password9"),
          firstName: "Liam",
          lastName: "Harper",
        },
        {
          email: "TeddyL@user.io",
          username: "Teddytester",
          hashedPassword: bcrypt.hashSync("password10"),
          firstName: "Teddy",
          lastName: "Loo",
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
        username: {
          [Op.in]: ["Demo-lition", "EliThaGoat", "aaronThaMan", "JGtester"],
        },
      },
      {}
    );
  },
};
