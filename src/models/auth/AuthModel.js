// Database instance
const Config = require("../../config/config.js");

class AuthModel {
  static async findUserByName(username) {
    const sql = `
                SELECT tu.usuario, tu.senha, tu.id_ambiente, ta.Nome 
                FROM tb_Usuario as tu 
                JOIN tb_Ambientes as ta
                    ON tu.id_ambiente = ta.Codigo 
                WHERE usuario = ?
            `;

    return Config.sql(sql, [username.trim()]);
  }
}

module.exports = AuthModel;
