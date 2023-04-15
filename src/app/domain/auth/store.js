const { postgres } = require("../db");

class AuthToken {
  static async insertToken(tokenData) {
    const { userId, token } = tokenData;

    const tokenQuery = await postgres.client.query(
      'INSERT INTO auth-tokens("userId",token) VALUES($1,$2) RETURNING *',
      [userId, token]
    );
    return tokenQuery.rows[0];
  }

  static async getToken(token) {
    const tokenQuery = await postgres.client.query(
      "SELECT * FROM auth-tokens WHERE token=$1",
      [token]
    );
    return tokenQuery.rows[0];
  }

  static async deleteToken(userId) {
    const tokenQuery = await postgres.client.query(
      'DELETE FROM auth-tokens WHERE "userId"=$1',
      [userId]
    );
    return tokenQuery.rows[0];
  }
}

module.exports = { AuthToken };
