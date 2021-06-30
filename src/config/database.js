require("dotenv").config();

module.exports = {
  url:
    process.env.DATABASE_URL ||
    "mysql://root:bcd127@localhost:3306/nymer_quizz",
  config: {
    dialect: "mysql",
    define: {
      timestamp: true,
      underscored: true,
    },
  },
};
