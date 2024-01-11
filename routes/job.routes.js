const Router = require('express');
const router = new Router();
const jobController = require('../controller/job.controller');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');
const { check } = require('express-validator');

router.post(
  '/',
  roleMiddleware(['admin', 'company']),
  authMiddleware,
  [check('title', "Title field name can't be empty").notEmpty()],
  jobController.createJob
);
router.get(
  '/:id',
  roleMiddleware(['admin', 'company', 'applicant']),
  authMiddleware,
  jobController.getJobsByCompany
);
router.get(
  '/',
  roleMiddleware(['admin', 'company', 'applicant']),
  authMiddleware,
  jobController.getAllJobs
);
router.put(
  '/',
  roleMiddleware(['admin', 'company']),
  authMiddleware,
  jobController.updateJob
);
router.delete(
  '//:id',
  roleMiddleware(['admin', 'company']),
  authMiddleware,
  jobController.deleteJob
);

module.exports = router;
