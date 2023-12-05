const Router = require('express');
const router = new Router();
const companyController = require('../controller/company.controller');

router.post('/company', companyController.createCompany);
router.get('/company/:id', companyController.getOneCompany);
router.get('/company', companyController.getCompanies);
router.put('/company', companyController.updateCompany);
router.delete('/company/:id', companyController.deleteCompany);

module.exports = router;
