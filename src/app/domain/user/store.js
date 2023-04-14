const { postgres } = require("../db");

class User {
  static async InsertUser(userData) {
    const { firstName, lastName, email, password } = userData;

    const userQuery = await postgres.client.query(
      'INSERT INTO users("firstName","lastName","email","password") VALUES($1,$2,$3,$4) RETURNING *',
      [firstName, lastName, email, password]
    );
    return userQuery.rows[0];
  }

  static async getUserByEmail(email) {
    const userQuery = await postgres.client.query(
      "SELECT * FROM users WHERE email=$1",
      email
    );
    return userQuery.rows[0];
  }
}

module.exports = { User };
