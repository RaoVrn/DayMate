const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const tasksRouter = require('./routes/tasks');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(bodyParser.json());

app.use('/api/tasks', tasksRouter);

app.get('/', (req, res) => res.send({ message: 'DayMate Server Running ✅' }));

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
