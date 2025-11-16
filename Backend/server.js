require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./config/db');

const app = express();

//middleware
app.use(cors());
app.use(express.json());

//This part is for testing the db connection
db.getConnection((err, connection) => {
    if (err) {
      console.log("MySQL failed to connect:", err);
    } else {
      console.log("MySQL is now Connected!");
      connection.release();
    }
  });
  
//Testing Routes
app.get('/', (req, res) => {
    res.json({message: 'Backend is running!'});
});

//Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

//Creating endpoints
const authRoutes = require('./routes/authRoutes');
const exportRoutes = require('./routes/exportRoutes');
const artistRoutes = require('./routes/artistRoutes');
const songRoutes = require('./routes/songRoutes');
const playlistRoutes = require('./routes/playlistRoutes');
const playlistSongRoutes = require('./routes/playlistSongRoutes');
const userRoutes = require('./routes/userRoutes');

app.use('/api/auth', ()=> authRoutes);
app.use('/api/artist', artistRoutes);
app.use('/api/export', ()=> exportRoutes);
app.use('/api/song', songRoutes);
app.use('/api/playlist', ()=>  playlistRoutes);
app.use('/api/playlistSong', ()=> playlistSongRoutes);
app.use('/api/user', ()=> userRoutes);