const Config = require("../config/config.js");

class AuthRepository {
    async findUserByName(username) {
        try {
            if (!username || typeof username !== 'string' || username.trim() === '') {
                console.log("Nome de usuário inválido.");
                return null;
            }
            
            const sql = `
                SELECT tu.usuario, tu.senha, tu.id_ambiente, ta.Nome 
                FROM tb_Usuario as tu 
                JOIN tb_Ambientes as ta
                    ON tu.id_ambiente = ta.Codigo 
                WHERE usuario = ?
            `;

            const [user] = await Config.sql(sql, [username.trim()]);
    
            console.log(user);

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
