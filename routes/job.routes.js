const Router = require('express');
const router = new Router();
const jobController = require('../controller/job.controller');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

router.post(
  '/job',
  roleMiddleware(['admin', 'company']),
  authMiddleware,
  jobController.createJob
);
router.get(
  '/job/:id',
  roleMiddleware(['admin', 'company', 'applicant']),
  authMiddleware,
  jobController.getJobsByCompany
);
router.get(
  '/job',
  roleMiddleware(['admin', 'company', 'applicant']),
  authMiddleware,
  jobController.getAllJobs
);
router.put(
  '/job',
  roleMiddleware(['admin', 'company']),
  authMiddleware,
  jobController.updateJob
);
router.delete(
  '/job/:id',
  roleMiddleware(['admin', 'company']),
  authMiddleware,
  jobController.deleteJob
);

module.exports = router;
