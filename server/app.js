const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const sequelize = require('./config/database');
const authRoutes = require('./routes/authRoutes');
const jobRoutes = require('./routes/jobRoutes');
const companyRoutes = require('./routes/companiesRoutes')
const talentsRoutes = require('./routes/talentsRoutes')
const skillsRoutes = require('./routes/skillsRoutes');
const uploadRoutes = require('./routes/uploadRoutes');
const actionsRoutes = require('./routes/actionsRoutes');
const jobTitlesRoutes = require('./routes/jobTitlesRoutes');
const linksRoutes = require('./routes/linksRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
require("./models/associations"); // Ensure associations are set up before syncing



dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());
// app.use(cors({
//   origin: 'https://talentiave.com', // Only allow your frontend
//   methods: 'GET,POST,PUT,DELETE',
//   allowedHeaders: 'Content-Type,Authorization',
//   credentials: true
// }));

app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/companies/', companyRoutes);
app.use('/api/talents/', talentsRoutes);
app.use('/api/skills', skillsRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/actions', actionsRoutes);
app.use('/api/job-titles', jobTitlesRoutes);
app.use('/api/links/', linksRoutes);
app.use('/api/dashboard/', dashboardRoutes);

const PORT = process.env.PORT || 6000;

sequelize.authenticate()
  .then(() => {
    console.log('Database connected...');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.log('Error connecting to the database:', err));