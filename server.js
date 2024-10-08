const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const bookRoutes = require('./routes/bookRoutes');
const memberRoutes = require('./routes/memberRoutes');
const dotenv = require('dotenv');
const cors = require('cors');
dotenv.config();

const app = express();

const corsOptions = {
    origin: 'http://127.0.0.1:5500', 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: ['Authorization', 'Content-Type'],
};
app.use(cors(corsOptions));


app.use(cors())
app.use(bodyParser.json());

app.use('/api', authRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/members', memberRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
