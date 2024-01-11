const Router = require('express');
const router = new Router();
const jobApplicationController = require('../controller/job-application.controller');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');
const { check } = require('express-validator');

router.post(
  '/',
  roleMiddleware(['admin', 'applicant']),
  authMiddleware,
  [check('content', "Content field name can't be empty").notEmpty()],
  jobApplicationController.createJobApplication
);
router.get(
  '/:id',
  roleMiddleware(['admin', 'company', 'applicant']),
  authMiddleware,
  jobApplicationController.getJobApplicationsByJob
);
router.get(
  '/',
  roleMiddleware(['admin', 'company', 'applicant']),
  authMiddleware,
  jobApplicationController.getAllJobApplication
);
router.delete(
  '//:id',
  roleMiddleware(['admin', 'applicant']),
  authMiddleware,
  jobApplicationController.deleteJobApplication
);

module.exports = router;
