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
    const id = req.params.id;
    const jobs = await db.query('select * from job where company_id = $1', [
      id,
    ]);
    res.json(jobs.rows);
  }

  async getAllJobs(req, res) {
    const jobs = await db.query('SELECT * FROM job');
    res.json(jobs.rows);
  }
  async updateJob(req, res) {
    const { title, content, id } = req.body;
    const job = await db.query(
      'UPDATE job set title = $1, content = $2 where id = $3 RETURNING *',
      [title, content, id]
    );
    res.json(job.rows[0]);
  }

  async deleteJob(req, res) {
    const id = req.params.id;
    const jobs = await db.query('DELETE FROM job where id = $1', [id]);
    res.json(jobs.rows);
  }
}

module.exports = new JobController();
