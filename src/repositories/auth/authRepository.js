// Models
const authModel = require("../../models/auth/AuthModel.js");

class AuthRepository {
  async findUserByName(username) {
    try {
      if (!username || typeof username !== "string" || username.trim() === "") {
        console.log("Nome de usuário inválido.");
        return null;
      }
      const [user] = await authModel.findUserByName(username);

      if (!user) {
        console.log(`Usuário ${username} não encontrado.`);
        return null;
      }

      return user;
    } catch (error) {
      console.log(`Erro ao encontrar usuário ${username}.`, error);
      throw error;
    }
  }
}

module.exports = AuthRepository;
