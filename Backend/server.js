require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./config/db');

const app = express();

//middleware
app.use(cors());
app.use(express.json());

//This part is for testing the db connection
db.getConnection()
.then(() => console.log('MySQL is now Connected!'))
.catch(err => console.log('MySQL failed to connect...', err));

//Testing Routes
app.get('/', (req, res) => {
    res.json({message: 'Backend is running!'});
});
//Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
