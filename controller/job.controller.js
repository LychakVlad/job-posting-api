const db = require('../db');
const { validationResult } = require('express-validator');

class JobController {
  async createJob(req, res) {
    try {
      const { title, content, companyId } = req.body;

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res
          .status(400)
          .json({ message: 'Error during creating the job', errors });
      }

      const newJob = await db.query(
        'INSERT INTO job (title, content, company_id) values ($1, $2, $3) RETURNING *',
        [title, content, companyId]
      );
      res.json(newJob.rows[0]);
    } catch (error) {
      console.error('Error creating the job:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async getJobsByCompany(req, res) {
    try {
      const id = req.params.id;
      const jobs = await db.query('select * from job where company_id = $1', [
        id,
      ]);
      res.json(jobs.rows);
    } catch (error) {
      console.error('Error getting jobs by company:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async getAllJobs(req, res) {
    try {
      const jobs = await db.query('SELECT * FROM job');
      res.json(jobs.rows);
    } catch (error) {
      console.error('Error getting all jobs:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async updateJob(req, res) {
    try {
      const { title, content, id } = req.body;
      const job = await db.query(
        'UPDATE job set title = $1, content = $2 where id = $3 RETURNING *',
        [title, content, id]
      );
      res.json(job.rows[0]);
    } catch (error) {
      console.error('Error updating the job:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async deleteJob(req, res) {
    try {
      const id = req.params.id;
      const jobs = await db.query('DELETE FROM job where id = $1 RETURNING *', [
        id,
      ]);
      res.json(jobs.rows[0]);
    } catch (error) {
      console.error('Error deleting the job:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

module.exports = new JobController();
