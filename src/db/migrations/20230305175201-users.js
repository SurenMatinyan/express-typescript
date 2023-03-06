"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.sequelize.query(`CREATE TABLE "users" (
      "id" uuid NOT NULL,
      "email" varchar(255)  NOT NULL unique,
      "password" varchar(255) NOT NULL,
      "first_name" varchar(255),
      "last_name" varchar(255),
      "roles" jsonb not null,
      "created_date" timestamptz(6),
      "updated_date" timestamptz(6),
       PRIMARY KEY (id)
    ) ;
 `);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.sequelize.query(`DROP TABLE users;`);
  },
};
