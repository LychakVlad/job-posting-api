const Router = require('express');
const router = new Router();
const companyController = require('../controller/company.controller');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');
const { check } = require('express-validator');

router.post(
  '/',
  roleMiddleware(['admin', 'company']),
  authMiddleware,
  [check('name', "Comapny name can't be empty").notEmpty()],
  companyController.createCompany
);
router.get(
  '/:id',
  roleMiddleware(['admin', 'company', 'applicant']),
  authMiddleware,
  companyController.getOneCompany
);
router.get(
  '/',
  roleMiddleware(['admin', 'company', 'applicant']),
  authMiddleware,
  companyController.getCompanies
);
router.put(
  '/',
  roleMiddleware(['admin', 'company']),
  authMiddleware,
  companyController.updateCompany
);
router.delete(
  '/:id',
  roleMiddleware(['admin', 'company']),
  authMiddleware,
  companyController.deleteCompany
);

module.exports = router;
