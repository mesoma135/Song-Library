require('dotenv').config();

const express = require('express');
const cors = require('cors');
const db = require('./config/db');
const app = express();

const path = require('path');

//middleware
app.use(cors());
app.use(express.json());

// Serve static files from public folder
app.use(express.static(path.join(__dirname, 'Website')));

//testing the db connection
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

console.log('JWT_SECRET:', process.env.JWT_SECRET ? 'loaded' : 'missing');

//Creating endpoints
const authRoutes = require('./routes/authRoutes');
const exportRoutes = require('./routes/exportRoutes');
const artistRoutes = require('./routes/artistRoutes');
const songRoutes = require('./routes/songRoutes');
const playlistRoutes = require('./routes/playlistRoutes');
const playlistSongRoutes = require('./routes/playlistSongRoutes');
const adminRoutes = require('./routes/adminRoutes');
const newsapiRoutes = require('./routes/newsapiRoutes');
const errorMiddleware = require('./middleware/errorMiddleware');
const userRoutes = require('./routes/userRoutes');
const playHistory = require('./routes/playHistoryRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/artist', artistRoutes);
app.use('/api/export', exportRoutes);
app.use('/api/song', songRoutes);
app.use('/api/playlist', playlistRoutes);
app.use('/api/playlistSong', playlistSongRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/news', newsapiRoutes);
app.use('/api/globalerrorhandler', errorMiddleware);
app.use('/api/userprofile', userRoutes);
app.use('/api/', playHistory);