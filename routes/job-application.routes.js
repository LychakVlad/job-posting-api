const Router = require('express');
const router = new Router();
const jobApplicationController = require('../controller/job-application.controller');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

router.post(
  '/job-application',
  roleMiddleware(['admin', 'applicant']),
  authMiddleware,
  jobApplicationController.createJobApplication
);
router.get(
  '/job-application/:id',
  roleMiddleware(['admin', 'company', 'applicant']),
  authMiddleware,
  jobApplicationController.getJobApplicationsByJob
);
router.get(
  '/job-application',
  roleMiddleware(['admin', 'company', 'applicant']),
  authMiddleware,
  jobApplicationController.getAllJobApplication
);
router.delete(
  '/job-application/:id',
  roleMiddleware(['admin', 'applicant']),
  authMiddleware,
  jobApplicationController.deleteJobApplication
);

module.exports = router;
