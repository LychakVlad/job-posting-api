const db = require('../db');
const bcrypt = require('bcrypt');

class AuthController {
  async registration(req, res) {
    try {
      const { username, role, password, email } = req.body;
      const created_on = new Date();

      const candidate = await db.query(
        'SELECT username  FROM users where username = $1 ',
        [username]
      );

      if (candidate.rows.length !== 0) {
        console.log(candidate.rows.length);
        return res.status(400).json({ error: 'User already exists!' });
      }

      const hashPassword = bcrypt.hashSync(password, 7);

      const newUser = await db.query(
        'INSERT INTO users (username, role, password, email, created_on) values ($1, $2, $3, $4, $5) RETURNING *',
        [username, role, hashPassword, email, created_on]
      );

      res.json({ message: 'User registered successfully!' });
    } catch (error) {
      console.error('Error creating the user:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async login(req, res) {
    try {
    } catch (error) {}
  }

  async getUsers(req, res) {
    try {
      res.json(`everything is OK ${req}`);
    } catch (error) {}
  }
}

module.exports = new AuthController();
