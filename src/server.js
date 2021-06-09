const { httpServer } = require("./app");

const port = 3333;

httpServer.listen(port, () => {
  console.log(`Servidor Rodando na porta ${port}`);
});
