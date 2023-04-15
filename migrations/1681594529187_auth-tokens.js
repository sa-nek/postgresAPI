/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable("auth-tokens", {
    id: "id",
    token: { type: "varchar(255)", notNull: true },
    userId: { type: "integer", notNull: true, unique: true },
    lastName: { type: "varchar(100)" },
    createdAt: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("current_timestamp"),
    },
  });
  pgm.addConstraint("auth-tokens", "foreign-key-user-id", {
    foreignKeys: {
      columns: "userId",
      references: "users(id)",
    },
  });
};

exports.down = (pgm) => {
  pgm.dropConstraint("auth-tokens", "foreign-key-user-id");
  pgm.dropTable("auth-tokens");
};
