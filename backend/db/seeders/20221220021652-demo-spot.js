("use strict");

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
          lng: 116.44,
          name: "The Seattle Hilltop Retreat",
          description:
            "A secluded mansion located on a hilltop in Seattle, Washington, featuring expansive views of the city and Puget Sound, a modern design and large windows that highlight the surrounding nature.",
          price: 3999,
        },
        {
          ownerId: 1,
          address: "2223 Garth Ave",
          city: "Boulder",
          state: "CO",
          country: "USA",
          lat: 99.94,
          lng: 116.44,
          name: "In the Forest",
          description:
            "Surround yourself with the beauty of the forest next to you at all times.",
          price: 6989,
        },
        {
          ownerId: 2,
          address: "99 Alice Blvd",
          city: "Columbus",
          state: "OH",
          country: "USA",
          lat: 99.94,
          lng: 116.44,
          name: "Modern White",
          description: "A modern white mansion, straight to the point!",
          price: 5777,
        },
        {
          ownerId: 3,
          address: "2 Killion Dr.",
          city: "Fort Worth",
          state: "TX",
          country: "USA",
          lat: 99.94,
          lng: 116.44,
          name: "Spacious and Newly Renovated",
          description:
            "Recently renovated mansion in the heart of Fort Worth Texas.",
          price: 3877,
        },
        {
          ownerId: 4,
          address: "81st Madison",
          city: "Seattle",
          state: "WA",
          country: "USA",
          lat: 99.94,
          lng: 116.44,
          name: "Beautiful Old Style Mansion",
          description:
            "A mansion with extremely rich history in the roots of Seattle.",
          price: 4345,
        },
        {
          ownerId: 1,
          address: "33rd Linkin Blvd",
          city: "Reno",
          state: "NV",
          country: "USA",
          lat: 99.94,
          lng: 116.44,
          name: "Green in the Desert",
          description:
            "Find yourself in wonderful greenery in the middle of the desert.",
          price: 3323,
        },
        {
          ownerId: 2,
          address: "99 Grintil Lane",
          city: "Sacremento",
          state: "CA",
          country: "USA",
          lat: 99.94,
          lng: 116.44,
          name: "Enormous House with a great backyard view!",
          description:
            "Space for 20 people and a large backyard for many activities.",
          price: 6544,
        },
        {
          ownerId: 3,
          address: "82 Fie Ave",
          city: "Minneapolis",
          state: "MN",
          country: "USA",
          lat: 99.94,
          lng: 116.44,
          name: "Mansion Under the Sun",
          description:
            "Beaming light in the morning and extremely privacy in the evening, enjoy your stay here.",
          price: 3999,
        },
        {
          ownerId: 4,
          address: "32 Beach Blvd",
          city: "Huntington Beach",
          state: "CA",
          country: "USA",
          lat: 99.94,
          lng: 116.44,
          name: "Off The Cliff",
          description:
            "Right on the side of a beach and cliff view of the ocean, absolutely safe and beautiful views!",
          price: 5555,
        },
        {
          ownerId: 1,
          address: "4th Strip Blvd",
          city: "Las Vegas",
          state: "NV",
          country: "USA",
          lat: 99.94,
          lng: 116.44,
          name: "Wooden Paradise",
          description:
            "Full of oak wood the entire house is both modern and old, providing a relaxing stay for all.",
          price: 3887,
        },
        {
          ownerId: 2,
          address: "22 Las Hal Ln.",
          city: "Houston",
          state: "TX",
          country: "USA",
          lat: 99.94,
          name: "Concrete Wonder",
          description:
            "Older feel on the outside but newly renovated interior in 2023.",
          price: 4500,
        },
        {
          ownerId: 3,
          address: "13 Proccor Dr.",
          city: "Toledo",
          state: "OH",
          country: "USA",
          lat: 99.94,
          lng: 116.44,
          name: "Green Scenary in the middle of the city.",
          description:
            "Extremely large backyard and field, friendly neighbors and wonderful food nearby.",
          price: 4500,
        },
        {
          ownerId: 4,
          address: "88 Spot Ave.",
          city: "Pasadena",
          state: "CA",
          country: "USA",
          lat: 99.94,
          lng: 116.44,
          name: "Mansion Pool Combo.",
          description:
            "Lots of space for family activities including a huge pool and lots of greenery.",
          price: 4500,
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
          [Op.in]: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
        },
      },
      {}
    );
  },
};
