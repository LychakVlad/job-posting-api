const db = require('../db');

class ApplicantController {
  async createApplicant(req, res) {
    const { applicant_name, resume, email } = req.body;
    console.log(applicant_name, resume, email);
    const newApplicant = await db.query(
      'INSERT INTO applicant (applicant_name, resume, email) values ($1, $2, $3) RETURNING *',
      [applicant_name, resume, email]
    );
    res.send(newApplicant.rows[0]);
  }

  async getAllApplicant(req, res) {
    const applicants = await db.query('SELECT * FROM applicant');
    res.json(applicants.rows);
  }

  async getApplicant(req, res) {
    const id = req.params.id;
    const applicant = await db.query('SELECT * FROM applicant where id = $1', [
      id,
    ]);
    res.json(applicant.rows[0]);
  }

  async updateApplicant(req, res) {
    const { applicant_name, resume, email, id } = req.body;
    const applicant = await db.query(
      'UPDATE applicant set applicant_name = $1,  resume = $2, email = $3 where id = $4 RETURNING *',
      [applicant_name, resume, email, id]
    );
    res.json(applicant.rows[0]);
  }

  async deleteApplicant(req, res) {
    const id = req.params.id;
    console.log(id);
    const applicant = await db.query('DELETE FROM applicant where id = $1', [
      id,
    ]);
    res.json(applicant.rows);
  }
}

module.exports = new ApplicantController();
