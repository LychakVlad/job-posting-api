const Router = require('express');
const router = new Router();
const jobController = require('../controller/job.controller');
const authorize = require('../middleware/auth');

router.post('/job', jobController.createJob);
router.get('/job/:id', jobController.getJobsByCompany);
router.get('/job', authorize(), jobController.getAllJobs);
router.put('/job', jobController.updateJob);
router.delete('/job/:id', jobController.deleteJob);

module.exports = router;
