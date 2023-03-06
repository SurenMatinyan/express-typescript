"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.sequelize.query(`CREATE TABLE "products" (
      "id" uuid NOT NULL,
      "name" varchar(255) NOT NULL,
      "images" jsonb default '[]'::jsonb,
      "description" varchar(255),
      "tags" jsonb default '[]'::jsonb,
      "price" integer not null,
      "creator_id" uuid not null,
      "created_date" timestamptz(6),
      "updated_date" timestamptz(6),
      "category_id" uuid not null,
      FOREIGN KEY (creator_id) REFERENCES users (id) ON DELETE CASCADE,
      FOREIGN KEY (category_id) REFERENCES categories (id) ON DELETE CASCADE,
      PRIMARY KEY (id)
    )  ;
 `);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.sequelize.query(`DROP TABLE products;`);
  },
};
