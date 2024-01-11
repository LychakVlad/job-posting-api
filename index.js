const express = require('express');
const companyRouter = require('./routes/company.routes');
const jobRouter = require('./routes/job.routes');
const applicantRouter = require('./routes/applicant.routes');
const jobApplicationRouter = require('./routes/job-application.routes');
const authRouter = require('./routes/auth.routes');

const PORT = process.env.PORT || 3002;

const app = express();

app.use(express.json());
app.use('/comapny', companyRouter);
app.use('/job', jobRouter);
app.use('/applicant', applicantRouter);
app.use('/job-application', jobApplicationRouter);
app.use('/', authRouter);

app.listen(PORT, () => console.log(`server started on port ${PORT}`));
