const Router = require('express');
const router = new Router();
const applicantController = require('../controller/applicant.controller');
const roleMiddleware = require('../middleware/roleMiddleware');
const authMiddleware = require('../middleware/authMiddleware');
const { check } = require('express-validator');

router.post(
  '/',
  roleMiddleware(['applicant', 'admin']),
  authMiddleware,
  [
    check('email', "Email can't be empty").notEmpty(),
    check('applicant_name', "Name can't be empty").notEmpty(),
  ],
  applicantController.createApplicant
);
router.get(
  '/',
  roleMiddleware(['applicant', 'admin', 'company']),
  authMiddleware,
  applicantController.getAllApplicant
);
router.get(
  '/:id',
  roleMiddleware(['applicant', 'admin', 'company']),
  authMiddleware,
  applicantController.getApplicant
);
router.put(
  '/',
  roleMiddleware(['applicant', 'admin']),
  authMiddleware,
  applicantController.updateApplicant
);
router.delete(
  '/:id',
  roleMiddleware(['applicant', 'admin']),
  authMiddleware,
  applicantController.deleteApplicant
);

module.exports = router;
