const db = require('../db');
const { validationResult } = require('express-validator');

class JobApplicationController {
  async createJobApplication(req, res) {
    try {
      const { content, applied_at, status, job_id, applicant_id } = req.body;

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res
          .status(400)
          .json({
            message: 'Error during creating the job application',
            errors,
          });
      }

      const newJob = await db.query(
        'INSERT INTO job_application (content, applied_at, status, job_id, applicant_id) values ($1, $2, $3, $4, $5) RETURNING *',
        [content, applied_at, status, job_id, applicant_id]
      );
      res.json(newJob.rows[0]);
    } catch (error) {
      console.error('Error creating the job application:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async getJobApplicationsByJob(req, res) {
    try {
      const jobId = req.params.id;
      const jobs = await db.query(
        'SELECT * FROM job_application where job_id = $1',
        [jobId]
      );
      res.json(jobs.rows);
    } catch (error) {
      console.error('Error getting all jobs applications:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async getAllJobApplication(req, res) {
    try {
      const jobs = await db.query('SELECT * FROM job_application');
      res.json(jobs.rows);
    } catch (error) {
      console.error('Error getting all jobs applications:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async deleteJobApplication(req, res) {
    try {
      const id = req.params.id;
      const jobApplication = await db.query(
        'DELETE FROM job_application where id = $1 RETURNING *',
        [id]
      );
      res.json(jobApplication.rows[0]);
    } catch (error) {
      console.error('Error deleting the job application:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

module.exports = new JobApplicationController();
