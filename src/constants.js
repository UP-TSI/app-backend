const path = require("path");
// TODO: Melhoras os acessos nas pastas por meio de constantes
module.exports = {
  PATHS: {
    CONTROLLERS: path.join(__dirname, "controllers"),
    ROUTES: path.join(__dirname, "routes"),
  },
};
