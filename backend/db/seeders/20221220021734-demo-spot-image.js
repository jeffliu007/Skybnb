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
          url: "https://images.pexels.com/photos/4450329https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=800/pexels-photo-4450329.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
          preview: true,
        },
        {
          spotId: 2,
          url: "https://images.pexels.com/photos/53610/large-home-residential-house-architecture-53610.jpeg?auto=compress&cs=tinysrgb&w=800",
          preview: true,
        },
        {
          spotId: 3,
          url: "https://images.pexels.com/photos/7031406/pexels-photo-7031406.jpeg?auto=compress&cs=tinysrgb&w=800",
          preview: true,
        },
        {
          spotId: 4,
          url: "https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg?auto=compress&cs=tinysrgb&w=800",
          preview: true,
        },
        {
          spotId: 5,
          url: "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=800",
          preview: true,
        },
        {
          spotId: 6,
          url: "https://images.pexels.com/photos/3155666/pexels-photo-3155666.jpeg?auto=compress&cs=tinysrgb&w=800",
          preview: true,
        },
        {
          spotId: 7,
          url: "https://images.pexels.com/photos/1115804/pexels-photo-1115804.jpeg?auto=compress&cs=tinysrgb&w=800",
          preview: true,
        },
        {
          spotId: 8,
          url: "https://images.pexels.com/photos/7031596/pexels-photo-7031596.jpeg?auto=compress&cs=tinysrgb&w=800",
          preview: true,
        },
        {
          spotId: 10,
          url: "https://images.pexels.com/photos/1732414/pexels-photo-1732414.jpeg?auto=compress&cs=tinysrgb&w=800",
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
        spotId: { [Op.in]: [1, 2, 3, 4] },
      },
      {}
    );
  },
};
