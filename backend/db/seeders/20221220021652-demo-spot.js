"use strict";

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}
module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = "Spots";
    return queryInterface.bulkInsert(
      options,
      [
        {
          ownerId: 1,
          address: "7001 Sherwood Rd",
          city: "Joshua Tree",
          state: "CA",
          country: "USA",
          lat: 34.12,
          lng: 116.34,
          name: "Back Yard Paradise",
          description: "Two bedroom home with a brand new hot tub!.",
          price: 201,
        },
        {
          ownerId: 2,
          address: "55788 Sunnyslope Dr",
          city: "Landers",
          state: "CA",
          country: "USA",
          lat: 34.27,
          lng: 116.44,
          name: "Desert Adventure",
          description:
            "A comfortable stay in our beautiful location with the desert nature.",
          price: 102,
        },
        {
          ownerId: 3,
          address: "17933 Castellammare Dr",
          city: "Los Angeles",
          state: "CA",
          country: "USA",
          lat: 34.04,
          lng: 118.56,
          name: "Ocean Getaway",
          description: "Steps to the ocean, beautiful location.",
          price: 118,
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = "Spots";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      options,
      {
        ownerId: {
          [Op.in]: [1, 2, 3],
        },
      },
      {}
    );
  },
};
