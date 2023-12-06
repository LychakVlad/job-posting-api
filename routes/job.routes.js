const Router = require('express');
const router = new Router();
const jobController = require('../controller/job.controller');

router.post('/job', jobController.createJob);
router.get('/job', jobController.getJobsByCompany);

module.exports = router;
