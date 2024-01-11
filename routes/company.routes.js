const Router = require('express');
const router = new Router();
const companyController = require('../controller/company.controller');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

router.post(
  '/company',
  roleMiddleware(['admin', 'company']),
  authMiddleware,
  companyController.createCompany
);
router.get(
  '/company/:id',
  roleMiddleware(['admin', 'company', 'applicant']),
  authMiddleware,
  companyController.getOneCompany
);
router.get(
  '/company',
  roleMiddleware(['admin', 'company', 'applicant']),
  authMiddleware,
  companyController.getCompanies
);
router.put(
  '/company',
  roleMiddleware(['admin', 'company']),
  authMiddleware,
  companyController.updateCompany
);
router.delete(
  '/company/:id',
  roleMiddleware(['admin', 'company']),
  authMiddleware,
  companyController.deleteCompany
);

module.exports = router;
