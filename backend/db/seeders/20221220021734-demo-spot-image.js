("use strict");

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
          url: "https://images.pexels.com/photos/59924/pexels-photo-59924.jpeg?auto=compress&cs=tinysrgb&w=800",
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
          url: "https://images.pexels.com/photos/87378/pexels-photo-87378.jpeg?auto=compress&cs=tinysrgb&w=600",
          preview: true,
        },
        {
          spotId: 6,
          url: "https://images.pexels.com/photos/1115804/pexels-photo-1115804.jpeg?auto=compress&cs=tinysrgb&w=600",
          preview: true,
        },
        {
          spotId: 7,
          url: "https://images.pexels.com/photos/816198/pexels-photo-816198.jpeg?auto=compress&cs=tinysrgb&w=600",
          preview: true,
        },
        {
          spotId: 8,
          url: "https://images.pexels.com/photos/3965528/pexels-photo-3965528.jpeg?auto=compress&cs=tinysrgb&w=600",
          preview: true,
        },
        {
          spotId: 9,
          url: "https://images.pexels.com/photos/7031595/pexels-photo-7031595.jpeg?auto=compress&cs=tinysrgb&w=600",
          preview: true,
        },
        {
          spotId: 10,
          url: "https://images.pexels.com/photos/1694360/pexels-photo-1694360.jpeg?auto=compress&cs=tinysrgb&w=600",
          preview: true,
        },
        {
          spotId: 11,
          url: "https://images.pexels.com/photos/962989/pexels-photo-962989.jpeg?auto=compress&cs=tinysrgb&w=600",
          preview: true,
        },
        {
          spotId: 12,
          url: "https://images.pexels.com/photos/2832183/pexels-photo-2832183.jpeg?auto=compress&cs=tinysrgb&w=600",
          preview: true,
        },
        {
          spotId: 13,
          url: "https://images.pexels.com/photos/32870/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=600",
          preview: true,
        },
        {
          spotId: 14,
          url: "https://images.pexels.com/photos/696025/pexels-photo-696025.jpeg?auto=compress&cs=tinysrgb&w=600",
          preview: true,
        },
        {
          spotId: 15,
          url: "https://images.pexels.com/photos/7061659/pexels-photo-7061659.jpeg?auto=compress&cs=tinysrgb&w=600",
          preview: true,
        },
        {
          spotId: 16,
          url: "https://images.pexels.com/photos/8143671/pexels-photo-8143671.jpeg?auto=compress&cs=tinysrgb&w=600",
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
        spotId: {
          [Op.in]: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
        },
      },
      {}
    );
  },
};
