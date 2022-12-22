"use strict";

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}
module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = "Bookings";
    return queryInterface.bulkInsert(
      options,
      [
        {
          spotId: 1,
          userId: 1,
          startDate: new Date(2022, 11, 12),
          endDate: new Date(2022, 11, 14),
        },
        {
          spotId: 2,
          userId: 2,
          startDate: new Date(2022, 10, 15),
          endDate: new Date(2022, 11, 2),
        },
        {
          spotId: 3,
          userId: 3,
          startDate: new Date(2022, 10, 17),
          endDate: new Date(2022, 11, 7),
        },
        {
          spotId: 4,
          userId: 4,
          startDate: new Date(2022, 8, 19),
          endDate: new Date(2022, 9, 17),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = "Bookings";
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
