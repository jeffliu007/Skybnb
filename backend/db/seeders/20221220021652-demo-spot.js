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
          address: "9857 20th Ave",
          city: "Seattle",
          state: "WA",
          country: "USA",
          lat: 99.94,
          lng: -99.99,
          name: "The Seattle Hilltop Retreat",
          description:
            "A secluded mansion located on a hilltop in Seattle, Washington, featuring expansive views of the city and Puget Sound, a modern design and large windows that highlight the surrounding nature.",
          price: 3999,
        },
        {
          ownerId: 5,
          address: "513 N Crescent Dr",
          city: "Beverly Hills",
          state: "CA",
          country: "United States",
          lat: 99.94,
          lng: -99.99,
          name: "Beverly Hills Getaway",
          description:
            "A luxurious mansion located in the heart of Beverly Hills, California, featuring a grand entrance, multiple bedrooms, and a beautiful backyard with a pool and tennis court.",
          price: 5200,
        },
        {
          ownerId: 6,
          address: "170 W Kahamanu Ave",
          city: "Kahului",
          state: "HI",
          country: "United States",
          lat: 99.94,
          lng: -99.99,
          name: "Maui at your Door",
          description:
            "A tropical paradise located on the ocean in Hawaii, featuring a private waterfront-room, multiple outdoor entertaining spaces, and breathtaking views of the ocean.",
          price: 1900,
        },
        {
          ownerId: 7,
          address: "220 Hollywood Ave",
          city: "Hollywood",
          state: "CA",
          country: "United States",
          lat: 99.94,
          lng: -99.99,
          name: "Hollywood Hills Private Mansion",
          description:
            "A newly renovated mansion right at the tip of the Hollywood Hills where you may encounter many celebrities in this exclusive neighborhood. Home comes with butler service and free chauffeur.",
          price: 3330,
        },
        {
          ownerId: 8,
          address: "192 Kledan Dr",
          city: "Glendale",
          state: "CA",
          country: "United States",
          lat: 99.94,
          lng: -99.99,
          name: "Innovating Design and Spacious",
          description:
            "Extremely spacious home with an elegant interior and a much larger exterior. The grass on the property will always be kept up in perfect condition, satisfaction guranteed.",
          price: 2325,
        },
        {
          ownerId: 9,
          address: "77 Creedmore Ave",
          city: "Huntington Beach",
          state: "CA",
          country: "United States",
          lat: 99.94,
          lng: -99.99,
          name: "Beachfront Property Newly Furnished",
          description:
            "Already on the beach before you make it out the door. You will be enjoying your stay here once you experience the sound of the ocean at night and the unlimited surfing opportunities during the day.",
          price: 2325,
        },
        {
          ownerId: 10,
          address: "9511 Jenkins Blvd",
          city: "Russell City",
          state: "CA",
          country: "United States",
          lat: 99.94,
          lng: -99.99,
          name: "Beautiful Property on the Water",
          description:
            "Enjoy your time here at our wonderful home. Water access begins at the backyard and we have a huge variety of water sports to entertain up to 10 guests. This includes jet-skis and small boats. We welcome you all anytime.",
          price: 2325,
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
