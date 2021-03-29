module.exports = {
    url: 'mysql://root:bcd127@localhost:3306/nimer_quizz',
    config: {
      dialect: "mysql",
      define: {
        timestamp: true,
        underscored: true,
      },
    },
  };