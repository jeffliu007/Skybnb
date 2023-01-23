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
          address: "8046 Doug Hill",
          city: "San Diego",
          state: "CA",
          country: "United States",
          lat: 34.12,
          lng: 116.34,
          name: "Paradise Awaits",
          description:
            "San Diego is waiting for you to arrive at this wonderful mansion that includes a private pool and enormous space.",
          price: 2200,
        },
        {
          ownerId: 2,
          address: "55788 Sunnyslope Dr",
          city: "Miami",
          state: "FL",
          country: "United States",
          lat: 34.27,
          lng: 116.44,
          name: "Florida Beachfront Mansion",
          description:
            "A palatial mansion located directly on the beach in Florida, featuring a large pool, private dock, and breathtaking views of the ocean.",
          price: 1900,
        },
        {
          ownerId: 3,
          address: "17933 Castellammare Dr",
          city: "Tellride",
          state: "CO",
          country: "United States",
          lat: 34.14,
          lng: 118.56,
          name: "Mountain Lodge Telluride",
          description:
            "A grand mountain retreat located in the Rocky Mountains of Colorado, featuring ski-in/ski-out access, a hot tub, and a spacious great room with a fireplace.",
          price: 2890,
        },
        {
          ownerId: 4,
          address: "9857 20th",
          city: "Seattle",
          state: "WA",
          country: "USA",
          lat: 99.94,
          name: "The Seattle Hilltop Retreat",
          description:
            "A secluded mansion located on a hilltop in Seattle, Washington, featuring expansive views of the city and Puget Sound, a modern design and large windows that highlight the surrounding nature.",
          price: 3999,
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
          [Op.in]: [1, 2, 3, 4],
        },
      },
      {}
    );
  },
};
