const User = require('../models/user');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const Config = require('../../config/config');

exports.login = async (req, res) => {
    const { username, password } = req.body;
    const sql = 'SELECT usuario, senha, id_ambiente FROM users WHERE username = ? LIMIT 1'
    const user = await Config.sql(sql, [username])

    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
};
