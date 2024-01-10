const { validationResult } = require('express-validator');
const db = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { secret } = require('../config');

const generateAccessToken = (id, role) => {
  const payload = {
    id,
    role,
  };

  return jwt.sign(payload, secret, { expiresIn: '24h' });
};

class AuthController {
  async registration(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res
          .status(400)
          .json({ message: 'Error during the registration', errors });
      }
      const { username, role, password, email } = req.body;
      const created_on = new Date();

      const candidate = await db.query(
        'SELECT username  FROM users where username = $1 ',
        [username]
      );

      if (candidate.rows.length !== 0) {
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
      const { username, password, email } = req.body;

      const user = await db.query('SELECT *  FROM users where username = $1 ', [
        username,
      ]);

      if (user.rows.length === 0) {
        return res.status(400).json({ error: 'User is not found!' });
      }

      const validPassword = bcrypt.compareSync(password, user.rows[0].password);
      if (!validPassword) {
        return res.status(400).json({ error: 'Password is not correct!' });
      }

      const token = generateAccessToken(
        user.rows[0].user_id,
        user.rows[0].role
      );

      return res.json({ token });
    } catch (error) {
      console.error('Error loggin in:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async getUsers(req, res) {
    try {
      const users = await db.query('SELECT *  FROM users ');
      res.json(users.rows);
    } catch (error) {
      console.error('Error getting the users:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

module.exports = new AuthController();
