const express = require('express');
const companyRouter = require('./routes/company.routes');
const jobRouter = require('./routes/job.routes');
const applicantRouter = require('./routes/applicant.routes');
const jobApplicationRouter = require('./routes/job-application.routes');

const PORT = process.env.PORT || 3002;

const app = express();

app.use(express.json());
app.use('/api', companyRouter);
app.use('/api', jobRouter);
app.use('/api', applicantRouter);
app.use('/api', jobApplicationRouter);

app.listen(PORT, () => console.log(`server started on port ${PORT}`));
