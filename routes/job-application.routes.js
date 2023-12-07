const Router = require('express');
const router = new Router();
const jobApplicationController = require('../controller/job-application.controller');

router.post('/job-application', jobApplicationController.createJobApplication);
router.get(
  '/job-application/:id',
  jobApplicationController.getJobApplicationsByJob
);
router.get('/job-application', jobApplicationController.getAllJobApplication);
router.delete(
  '/job-application/:id',
  jobApplicationController.deleteJobApplication
);

module.exports = router;
