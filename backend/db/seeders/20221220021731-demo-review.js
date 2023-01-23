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
          userId: 1,
          review:
            "Pretty overpriced but I still thought it was a decent location.",
          stars: 3,
        },
        {
          spotId: 1,
          userId: 2,
          review:
            "It was honestly alright, would come back again. Lovely host.",
          stars: 4,
        },
        {
          spotId: 1,
          userId: 3,
          review: "Could have been better for the price but I enjoyed it.",
          stars: 3,
        },
        {
          spotId: 1,
          userId: 4,
          review: "I hated this place but we lived",
          stars: 2,
        },
        {
          spotId: 1,
          userId: 5,
          review:
            "My wife and I loved being here and personally enjoyed every moment.",
          stars: 5,
        },
        {
          spotId: 1,
          userId: 6,
          review:
            "Very acceptable for my standards, would have loved a bit more space for my guests and I but I still enjoyed it nonetheless.",
          stars: 4,
        },
        {
          spotId: 1,
          userId: 7,
          review: "Cool place, thanks for having us!",
          stars: 4,
        },
        {
          spotId: 2,
          userId: 1,
          review: "Absolute blast, loved my stay",
          stars: 4,
        },
        {
          spotId: 2,
          userId: 2,
          review:
            "Loved my stay, made my vacation in Miami just so much better.",
          stars: 4,
        },
        {
          spotId: 2,
          userId: 3,
          review:
            "Couldn't be more pleased with this place, owner is awesome. 10/10 recommend to anyone.",
          stars: 5,
        },
        {
          spotId: 2,
          userId: 4,
          review:
            "Florida was wonderful for my first visit. I would definitely come here again.",
          stars: 5,
        },
        {
          spotId: 2,
          userId: 5,
          review:
            "Will definitely come here again with my family. Outstanding home with great services and timely responses, thanks!",
          stars: 4,
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
          userId: 3,
          review: "Simple, no complaints",
          stars: 3,
        },
        {
          spotId: 3,
          userId: 4,
          review: "Kept us warm and the place was great for the family",
          stars: 4,
        },
        {
          spotId: 3,
          userId: 5,
          review:
            "Wonderful spot to hangout and really enjoyed the visit. Wonderful owner",
          stars: 4,
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
          review:
            "Mediocre but not bad, nice little retreat. My family and I enjoyed our stay",
          stars: 4,
        },
        {
          spotId: 4,
          userId: 3,
          review: "Awesome place, kept us out of the rain and very spacious",
          stars: 4,
        },
        {
          spotId: 4,
          userId: 4,
          review: "Could have been a bit better, the walls are kind of thin.",
          stars: 2,
        },
        {
          spotId: 5,
          userId: 1,
          review:
            "Interesting place, a bit expensive but I have no complaints otherwise.",
          stars: 4,
        },
        {
          spotId: 5,
          userId: 2,
          review:
            "This city is spectacular. So much extravagence everywhere I go, I will come back again for sure.",
          stars: 5,
        },
        {
          spotId: 5,
          userId: 3,
          review: "Had a great time, thanks!",
          stars: 4,
        },
        {
          spotId: 6,
          userId: 1,
          review: "Wonderful place, absolute beauty",
          stars: 4,
        },
        {
          spotId: 6,
          userId: 2,
          review:
            "Hawaii is just too wonderful, I can't wait to visit this place again, thanks again.",
          stars: 4,
        },
        {
          spotId: 6,
          userId: 3,
          review: "My family and I truly enjoyed our stay here!",
          stars: 5,
        },
        {
          spotId: 7,
          userId: 3,
          review: "Spectacular scenary!",
          stars: 5,
        },
        {
          spotId: 7,
          userId: 4,
          review:
            "Bumped into a few Hollywood stars on my way home, what a coincidence.",
          stars: 5,
        },
        {
          spotId: 8,
          userId: 3,
          review: "Glad to be back in my hometown again, thanks to the owner.",
          stars: 5,
        },
        {
          spotId: 8,
          userId: 4,
          review: "Simple and clean.",
          stars: 3,
        },
        {
          spotId: 9,
          userId: 3,
          review:
            "Love being at the beach so close to my bed, enjoyed every second!",
          stars: 5,
        },
        {
          spotId: 9,
          userId: 3,
          review: "Too expensive imo.",
          stars: 2,
        },
        {
          spotId: 10,
          userId: 3,
          review:
            "What an absolute stunning home this is, everything was brand new, awesome!",
          stars: 5,
        },
        {
          spotId: 10,
          userId: 4,
          review: "Everything in this home was spot on, 10/10.",
          stars: 5,
        },
        {
          spotId: 10,
          userId: 5,
          review: "Loss for words, beautiful!",
          stars: 5,
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
