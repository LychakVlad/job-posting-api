const db = require('../db');

class ApplicantController {
  async createApplicant(req, res) {
    try {
      const { applicant_name, resume, email } = req.body;
      const newApplicant = await db.query(
        'INSERT INTO applicant (applicant_name, resume, email) values ($1, $2, $3) RETURNING *',
        [applicant_name, resume, email]
      );
      res.send(newApplicant.rows[0]);
    } catch (error) {
      console.error('Error creating the applicant:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async getAllApplicant(req, res) {
    try {
      const applicants = await db.query('SELECT * FROM applicant');
      res.json(applicants.rows);
    } catch (error) {
      console.error('Error getting all applicants:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async getApplicant(req, res) {
    try {
      const id = req.params.id;
      const applicant = await db.query(
        'SELECT * FROM applicant where id = $1',
        [id]
      );
      res.json(applicant.rows[0]);
    } catch (error) {
      console.error('Error getting applicant by ID:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async updateApplicant(req, res) {
    try {
      const { applicant_name, resume, email, id } = req.body;
      const applicant = await db.query(
        'UPDATE applicant set applicant_name = $1,  resume = $2, email = $3 where id = $4 RETURNING *',
        [applicant_name, resume, email, id]
      );
      res.json(applicant.rows[0]);
    } catch (error) {
      console.error('Error updating the applicant:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async deleteApplicant(req, res) {
    try {
      const id = req.params.id;
      const applicant = await db.query(
        'DELETE FROM applicant where id = $1 RETURNING *',
        [id]
      );
      res.json(applicant.rows[0]);
    } catch (error) {
      console.error('Error deleting the applicant:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

module.exports = new ApplicantController();
