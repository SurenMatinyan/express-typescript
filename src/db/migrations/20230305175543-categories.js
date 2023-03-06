"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.sequelize.query(`CREATE TABLE "categories" (
      "id" uuid NOT NULL,
      "name" varchar(255) NOT NULL,
      "parent_id" uuid default null,
      "first_name" varchar(255),
      "last_name" varchar(255),
      "created_date" timestamptz(6),
      "updated_date" timestamptz(6),
      FOREIGN KEY (parent_id) REFERENCES categories (id) ON DELETE CASCADE,
      PRIMARY KEY (id)
    )  ;
 `);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.sequelize.query(`DROP TABLE categories;`);
  },
};
