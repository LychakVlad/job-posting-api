const { json } = require('express');
const db = require('../db');

class CompanyController {
  async createCompany(req, res) {
    const { name, description } = req.body;
    const newComapny = await db.query(
      'INSERT INTO company (name, description) values ($1, $2) RETURNING * ',
      [name, description]
    );
    res.json(newComapny.rows[0]);
  }

  async getCompanies(req, res) {
    const companies = await db.query('SELECT * FROM company');
    res.json(companies.rows);
  }

  async getOneCompany(req, res) {}
  async updateCompany(req, res) {}
  async deleteCompany(req, res) {}
}

module.exports = new CompanyController();
