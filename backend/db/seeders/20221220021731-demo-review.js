"use strict";

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}
module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = "Reviews";
    return queryInterface.bulkInsert(
      options,
      [
        {
          spotId: 1,
          userId: 2,
          review: "Pretty mediocre",
          stars: 3,
        },
        {
          spotId: 1,
          userId: 3,
          review: "It was honestly alright",
          stars: 4,
        },
        {
          spotId: 1,
          userId: 4,
          review: "Could have been better",
          stars: 3,
        },
        {
          spotId: 2,
          userId: 1,
          review: "Absolute blast, loved my stay",
          stars: 4,
        },
        {
          spotId: 2,
          userId: 3,
          review: "Loved my stay",
          stars: 4,
        },
        {
          spotId: 2,
          userId: 4,
          review: "Couldn't be more pleased with this place",
          stars: 5,
        },
        {
          spotId: 3,
          userId: 1,
          review: "Stunning views all around",
          stars: 5,
        },
        {
          spotId: 3,
          userId: 2,
          review: "Gorgeous property!!",
          stars: 5,
        },
        {
          spotId: 3,
          userId: 4,
          review: "Simple, no complaints",
          stars: 3,
        },
        {
          spotId: 4,
          userId: 1,
          review: "Can't complain, decent spot",
          stars: 3,
        },
        {
          spotId: 4,
          userId: 2,
          review: "Mediocre but not bad",
          stars: 4,
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = "Reviews";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      options,
      {
        spotId: { [Op.in]: [1, 2, 3, 4] },
      },
      {}
    );
  },
};
