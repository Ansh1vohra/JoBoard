const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { connectDB } = require('./config/db');
const userRoutes = require('./routes/user');
const jobRoutes = require('./routes/jobs');
const applicationRoutes = require('./routes/application');
const companyRoutes = require('./routes/company');


const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use('/api/users', userRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/application', applicationRoutes);
app.use('/api/company', companyRoutes);

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}).catch(err => {
    console.error(err);
    process.exit(1);
});