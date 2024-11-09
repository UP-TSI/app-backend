const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const AuthRepository = require('../../repositories/authRepository.js');

class AuthController {
    constructor() {
        this.repository = new AuthRepository();
    }

    async login(req, res) {
        try {
            const { username, password } = req.body;

            if (!username || !password) {
                return res.status(400).json({ message: 'Username and password are required' });
            }

            const user = await this.repository.findUserByName(username);

            if (!user || !(user.senha === password)) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }

            const token = jwt.sign(
                { id: user.id_ambiente, username: user.usuario },
                process.env.JWT_SECRET,
                { expiresIn: '1h' }
            );
            return res.json({ Token: token, Id: user.id_ambiente, Nome:user.Nome });

        } catch (error) {
            console.error("Erro no login:", error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }

    async findUser(req, res) {
        try {
            const { username } = req.body;

            if (!username) {
                return res.status(400).json({ message: 'Username and password are required' });
            }

            const user = await this.repository.findUserByName(username);

            if (!user) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }

            return res.json({ Token: token, Id: user.id_ambiente, Nome:user.Nome });

        } catch (error) {
            console.error("Erro no login:", error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }
}

module.exports = AuthController;