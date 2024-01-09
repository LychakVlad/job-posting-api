const db = require('../db');

class AuthController {
  async registration(req, res) {
    try {
      const { username, role, password, email } = req.body;
      const created_on = new Date();
      const newUser = await db.query(
        'INSERT INTO users (username, role, password, email, created_on) values ($1, $2, $3, $4, $5) RETURNING *',
        [username, role, password, email, created_on]
      );
      res.send(newUser.rows[0]);
    } catch (error) {
      console.error('Error creating the applicant:', error);
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
