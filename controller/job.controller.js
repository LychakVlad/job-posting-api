const db = require('../db');

class JobController {
  async createJob(req, res) {
    const { title, content, companyId } = req.body;
    const newJob = await db.query(
      'INSERT INTO job (title, content, company_id) values ($1, $2, $3) RETURNING *',
      [title, content, companyId]
    );
    res.json(newJob.rows[0]);
  }

  async getJobsByCompany(req, res) {
    const id = req.query.id;
    const jobs = await db.query('select * from job where company_id = $1', [
      id,
    ]);
    res.json(jobs.rows);
  }
}

module.exports = new JobController();
