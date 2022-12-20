"use strict";

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}
module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = "SpotImages";
    return queryInterface.bulkInsert(
      options,
      [
        {
          spotId: 1,
          url: "https://images.pexels.com/photos/4450329/pexels-photo-4450329.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
          preview: true,
        },
        {
          spotId: 2,
          url: "https://images.pexels.com/photos/2983674/pexels-photo-2983674.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
          preview: true,
        },
        {
          spotId: 3,
          url: "https://images.pexels.com/photos/3217505/pexels-photo-3217505.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
          preview: true,
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = "SpotImages";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      options,
      {
        spotId: { [Op.in]: [1, 2, 3] },
      },
      {}
    );
  },
};
