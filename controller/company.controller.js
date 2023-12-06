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

  async getOneCompany(req, res) {
    const id = req.params.id;
    const company = await db.query('SELECT * FROM company where id = $1', [id]);
    res.json(company.rows[0]);
  }
  async updateCompany(req, res) {
    const { id, name, description } = req.body;
    const company = await db.query(
      'UPDATE company set name = $1, description = $2 where id = $3 RETURNING *',
      [name, description, id]
    );
    res.json(company.rows[0]);
  }
  async deleteCompany(req, res) {
    const id = req.params.id;
    const company = await db.query('DELETE FROM company where id = $1', [id]);
    res.json(company.rows[0]);
  }
}

module.exports = new CompanyController();
