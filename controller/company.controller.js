const db = require('../db');
const { validationResult } = require('express-validator');

class CompanyController {
  async createCompany(req, res) {
    try {
      const { name, description } = req.body;

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res
          .status(400)
          .json({ message: 'Error during creating the company', errors });
      }

      const newCompany = await db.query(
        'INSERT INTO company (name, description) VALUES ($1, $2) RETURNING *',
        [name, description]
      );
      res.json(newCompany.rows[0]);
    } catch (error) {
      console.error('Error creating company:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async getCompanies(req, res) {
    try {
      const companies = await db.query('SELECT * FROM company');
      res.json(companies.rows);
    } catch (error) {
      console.error('Error fetching companies:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async getOneCompany(req, res) {
    try {
      const id = req.params.id;
      const company = await db.query('SELECT * FROM company WHERE id = $1', [
        id,
      ]);
      if (company.rows.length === 0) {
        return res.status(404).json({ error: 'Company not found' });
      }
      res.json(company.rows[0]);
    } catch (error) {
      console.error('Error fetching company:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async updateCompany(req, res) {
    try {
      const { id, name, description } = req.body;
      const company = await db.query(
        'UPDATE company SET name = $1, description = $2 WHERE id = $3 RETURNING *',
        [name, description, id]
      );
      if (company.rows.length === 0) {
        return res.status(404).json({ error: 'Company not found' });
      }
      res.json(company.rows[0]);
    } catch (error) {
      console.error('Error updating company:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async deleteCompany(req, res) {
    try {
      const id = req.params.id;
      const company = await db.query(
        'DELETE FROM company WHERE id = $1 RETURNING *',
        [id]
      );
      if (company.rows.length === 0) {
        return res.status(404).json({ error: 'Company not found' });
      }
      res.json(company.rows[0]);
    } catch (error) {
      console.error('Error deleting company:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

module.exports = new CompanyController();
