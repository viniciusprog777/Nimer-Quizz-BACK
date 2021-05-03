module.exports = {
  url: "mysql://root:bcd127@localhost:3306/nymer_quizz",
  config: {
    dialect: "mysql",
    define: {
      timestamp: true,
      underscored: true,
    },
  },
};
