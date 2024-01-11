const Router = require('express');
const router = new Router();
const applicantController = require('../controller/applicant.controller');
const roleMiddleware = require('../middleware/roleMiddleware');
const authMiddleware = require('../middleware/authMiddleware');

router.post(
  '/applicant',
  roleMiddleware(['applicant', 'admin']),
  authMiddleware,
  applicantController.createApplicant
);
router.get(
  '/applicant',
  roleMiddleware(['applicant', 'admin', 'company']),
  authMiddleware,
  applicantController.getAllApplicant
);
router.get(
  '/applicant/:id',
  roleMiddleware(['applicant', 'admin', 'company']),
  authMiddleware,
  applicantController.getApplicant
);
router.put(
  '/applicant',
  roleMiddleware(['applicant', 'admin']),
  authMiddleware,
  applicantController.updateApplicant
);
router.delete(
  '/applicant/:id',
  roleMiddleware(['applicant', 'admin']),
  authMiddleware,
  applicantController.deleteApplicant
);

module.exports = router;
