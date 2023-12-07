const Router = require('express');
const router = new Router();
const applicantController = require('../controller/applicant.controller');

router.post('/applicant', applicantController.createApplicant);
router.get('/applicant', applicantController.getAllApplicant);
router.get('/applicant/:id', applicantController.getApplicant);
router.put('/applicant', applicantController.updateApplicant);
router.delete('/applicant/:id', applicantController.deleteApplicant);

module.exports = router;
