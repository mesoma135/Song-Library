
use songdb;

CREATE TABLE Artist (
ArtistID INT PRIMARY KEY,
Name VARCHAR(100) NOT NULL,
NumAlbums INT,
NumSongs INT,
TotalPlays BIGINT,
Followers BIGINT
);

CREATE TABLE Song (
SongID INT PRIMARY KEY,
Title VARCHAR(150) NOT NULL,
ArtistID INT,
Length TIME,
NumPlays BIGINT,
Genre VARCHAR(50),
ReleaseDate DATE,
FOREIGN KEY (ArtistID) REFERENCES Artist(ArtistID)
);

CREATE TABLE UserAccount (
    UserID INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    UserName VARCHAR(100) NOT NULL,
    Email VARCHAR(100) UNIQUE NOT NULL,
    JoinDate DATE,
    Password VARCHAR(200) NOT NULL,
    Country VARCHAR(35) NOT NULL,
    role VARCHAR(15) NOT NULL default 'user',
    isBanned tinyint(1) NOT NULL default '0'
);

CREATE TABLE Playlist (
PlaylistID INT PRIMARY KEY,
UserID INT,
PlaylistName VARCHAR(100),
DateCreated DATE,
FOREIGN KEY (UserID) REFERENCES UserAccount(UserID)
);

CREATE TABLE PlaylistSong (
PlaylistID INT NOT NULL AUTO_INCREMENT,
SongID INT,
DateAdded DATE,
PRIMARY KEY (PlaylistID, SongID),
FOREIGN KEY (PlaylistID) REFERENCES Playlist(PlaylistID)
ON DELETE CASCADE, 
FOREIGN KEY (SongID) REFERENCES Song(SongID)
);

CREATE TABLE UserHistory (
	HistoryID INT PRIMARY KEY,
    UserID INT,
    SongID INT, 
    PlayDate TIMESTAMP,
    Device VARCHAR(50),
    FOREIGN KEY (UserID) REFERENCES UserAccount(UserID),
    FOREIGN KEY (SongID) REFERENCES Song(SongID)
);

INSERT INTO Artist VALUES 
(1, 'Taylor Swift', 12 , 1700 , 10000000, 120000000),
(2, 'Stray Kids', 6 , 360, 500000, 5000000),
(3, 'Bad Omens', 3, 88, 300000, 660000),
(4, 'Gracie Abrams', 3 , 300, 12000000, 30000000),
(5, 'The Weeknd', 6, 1000, 40000000, 33000000),
(6, 'Burna Boy', 8, 428, 30000000, 22000000),
(7, 'Mitski', 7, 81, 100000000, 24000000);

INSERT INTO Song VALUES
(101, 'Anti-Hero', 1, '00:03:20', 1200000000, 'Pop', '2022-10-21'),
(102, 'Seven', 2, '00:03:05', 650000000, 'Kpop', '2023-07-14'),
(103, 'Just Pretend', 3, '00:03:58', 98000000, 'Metal', '2022-11-03'),
(104, 'I Miss You, I’m Sorry', 4, '00:03:24', 210000000, 'Indie Pop', '2020-02-21'),
(105, 'Blinding Lights', 5, '00:03:20', 3700000000, 'R&B', '2019-11-29'),
(106, 'Last Last', 6, '00:02:53', 540000000, 'Afrobeats', '2022-05-13'),
(107, 'Lavender Haze', 1, '00:03:23', 900000000, 'Pop', '2022-01-27'),
(108, 'All Too Well', 1, '00:05:29', 800000000, 'Pop', '2012-10-22'),
(109, 'Anti-Hero Remix', 1, '00:03:25', 400000000, 'Pop', '2023-02-10'),
(110, 'Cardigan', 1, '00:03:59', 650000000, 'Indie Pop', '2020-07-24'),
(111, 'Willow', 1, '00:03:34', 700000000, 'Pop', '2020-12-11'),
(112, 'MANIAC', 2, '00:03:12', 300000000, 'Kpop', '2022-03-18'),
(113, 'Gods Menu', 2, '00:03:39', 550000000, 'Kpop', '2020-06-17'),
(114, 'Back Door', 2, '00:03:28', 400000000, 'Kpop', '2020-09-23'),
(115, 'Miroh', 2, '00:03:21', 250000000, 'Kpop', '2019-03-25'),
(116, 'Thunderous', 2, '00:03:44', 200000000, 'Kpop', '2021-08-23'),
(117, 'The Death of Peace of Mind', 3, '00:04:17', 50000000, 'Metal', '2022-03-25'),
(118, 'What Do You Want From Me', 3, '00:03:34', 40000000, 'Metal', '2022-09-01'),
(119, 'Limits', 3, '00:04:12', 35000000, 'Metal', '2021-11-19'),
(120, 'The Worst in Me', 3, '00:03:50', 28000000, 'Metal', '2020-10-02'),
(121, 'Glass Houses', 3, '00:03:59', 30000000, 'Metal', '2020-05-15'),
(122, 'Friend', 4, '00:03:16', 15000000, 'Indie Pop', '2021-06-10'),
(123, '21', 4, '00:03:05', 10000000, 'Indie Pop', '2021-03-01'),
(124, 'I Miss You', 4, '00:03:45', 9000000, 'Indie Pop', '2020-11-20'),
(125, 'Feels Like', 4, '00:03:23', 7000000, 'Indie Pop', '2021-09-15'),
(126, 'Stay', 4, '00:03:34', 8000000, 'Indie Pop', '2022-01-05'),
(127, 'Save Your Tears', 5, '00:03:35', 2200000000, 'R&B', '2020-03-20'),
(128, 'Die For You', 5, '00:03:43', 1400000000, 'R&B', '2016-02-19'),
(129, 'Blinding Lights Remix', 5, '00:03:22', 1000000000, 'R&B', '2021-05-21'),
(130, 'In Your Eyes', 5, '00:03:58', 950000000, 'R&B', '2020-03-20'),
(131, 'Heartless', 5, '00:03:20', 1200000000, 'R&B', '2019-11-27'),
(132, 'Ye', 6, '00:03:08', 600000000, 'Afrobeats', '2018-07-06'),
(133, 'On The Low', 6, '00:03:14', 500000000, 'Afrobeats', '2018-06-22'),
(134, 'Anybody', 6, '00:03:12', 450000000, 'Afrobeats', '2019-08-02'),
(135, 'Gbona', 6, '00:03:20', 350000000, 'Afrobeats', '2018-07-27'),
(136, 'Last Last Remix', 6, '00:03:05', 200000000, 'Afrobeats', '2023-01-12'),
(137, 'Pearl', 7, '00:02:45', 17000000, 'sad', '2022-02-16'),
(138, 'Liquid Smooth', 7, '00:03:27', 12500000, 'indie', '2012-01-31'),
(139, 'First Love / Late Spring', 7, '00:04:37', 48000000, 'indie', '2014-05-09'),
(140, 'Your Best American Girl', 7, '00:03:32', 82000000, 'rock', '2016-03-01'),
(141, 'Washing Machine Heart', 7, '00:02:08', 200000000, 'indie', '2018-06-26'),
(142, 'My Love Mine All Mine', 7, '00:02:20', 450000000, 'pop', '2023-09-15');



INSERT INTO UserAccount VALUES
(1, 'Admin', 'songify.admin@gmail.com', '2020-01-01', '$2b$10$AQoEf9aKqBjcjw6TraLpp.uJ1a5nsTCiOh.zcHqae6nQSOkDvQhni', 'Canada', 'admin', 0), 
(2, 'Kaira', 'kaira.subramaniam@ontariotechu.net' , '2022-08-18', 'temp', 'Canada', 'user', 0),
(3, 'Kyle' , 'Kyle.siwazalian@ontariotechu.net', '2024-12-12', 'temp', 'Poland', 'user', 0),
(4, 'Mesoma', 'mesoma@ontariotechu.net', '2025-06-01', 'temp', 'Nigeria', 'user', 0),
(5, 'Najin' , 'najin.seifi@ontariotechu.net', '2023-03-01', 'temp', 'Iran', 'user', 0),
(6, 'Colton', 'Colton@ontariotechu.net', '2025-06-20', 'temp', 'Ukraine', 'user', 0);

 INSERT INTO Playlist VALUES
 (1,2, 'rnb', '2024-04-1'),
 (2, 1, 'workout jams' , '2025-05-13'),
 (3,3, 'loveMariza', '2025-11-19'),
 (4, 6, 'bops', '2025-09-10'),
 (5, 5, 'driving mix', '2024-12-08'),
 (6, 4, 'bangers', '2025-06-01');
 
 INSERT INTO PlaylistSong VALUES 
 (1, 101, '2025-11-04'),
 (1,102,'2025-11-04'),
 (2,105,'2025-11-04'),
 (2,103,'2025-11-04'),
 (3,104,'2025-11-04'),
 (3,101,'2025-11-04'),
 (4, 103, '2025-11-04'),
 (4, 102, '2025-11-04'),
 (5, 105,'2025-11-04'),
 (5, 104, '2025-11-04'),
 (6, 106, '2025-11-04'),
 (6, 105, '2025-11-04');
 
INSERT INTO UserHistory VALUES 
(1,1,101,'2025-11-04 09:00:00' , 'Phone'),
(2, 5, 105, '2025-11-04 09:30:00', 'Laptop'),
(3, 2, 102, '2025-11-04 13:10:00', 'Tablet'),
(4, 3, 106, '2025-11-04 19:00:00', 'Phone'),
(5, 4, 103,  '2025-11-04 18:34:00', 'Tablet'),
(6, 6, 104,  '2025-11-04 00:23:00', 'Laptop');

USE songdb;
SELECT * FROM songdb.Artist; 
SELECT * FROM songdb.Song; 
SELECT * FROM songdb.UserAccount; 
SELECT * FROM songdb.Playlist; 
SELECT * FROM songdb.PlaylistSong; 
SELECT * FROM songdb.UserHistory; 

ALTER TABLE Playlist DROP FOREIGN KEY playlist_ibfk_1;
ALTER TABLE UserAccount
MODIFY COLUMN UserID INT NOT NULL AUTO_INCREMENT;

ALTER TABLE UserHistory DROP FOREIGN KEY userhistory_ibfk_1;
ALTER TABLE UserAccount
MODIFY COLUMN UserID INT NOT NULL AUTO_INCREMENT;

ALTER TABLE Playlist
ADD CONSTRAINT playlist_ibfk_1
FOREIGN KEY (UserID) REFERENCES UserAccount(UserID);

ALTER TABLE UserHistory
ADD CONSTRAINT userhistory_ibfk_1
FOREIGN KEY (UserID) REFERENCES UserAccount(UserID);

SELECT 
    table_name, constraint_name
FROM 
    information_schema.key_column_usage
WHERE 
    referenced_table_name = 'UserAccount'
    AND referenced_column_name = 'UserID';
  SELECT
    table_name, constraint_name
FROM
    information_schema.key_column_usage
WHERE
    referenced_table_name = 'Playlist'
    AND referenced_column_name = 'PlaylistID';
    ALTER TABLE PlaylistSong DROP FOREIGN KEY playlistSong_ibfk_1;
    ALTER TABLE Playlist
MODIFY PlaylistID INT NOT NULL AUTO_INCREMENT;
ALTER TABLE PlaylistSong
ADD CONSTRAINT playlistSong_ibfk_1
FOREIGN KEY (PlaylistID) REFERENCES Playlist(PlaylistID);

ALTER TABLE PlaylistSong DROP FOREIGN KEY playlistSong_ibfk_1;
ALTER TABLE PlaylistSong
ADD CONSTRAINT playlistSong_ibfk_1
FOREIGN KEY (PlaylistID)
REFERENCES Playlist(PlaylistID)
ON DELETE CASCADE;

ALTER TABLE PlaylistSong 
DROP FOREIGN KEY playlistSong_ibfk_1;

ALTER TABLE Playlist
MODIFY COLUMN PlaylistID INT NOT NULL AUTO_INCREMENT;

ALTER TABLE Playlist 
MODIFY PlaylistID INT NOT NULL AUTO_INCREMENT;

ALTER TABLE PlaylistSong
ADD CONSTRAINT playlistSong_ibfk_1
FOREIGN KEY (PlaylistID)
REFERENCES Playlist(PlaylistID)
ON DELETE CASCADE;

CREATE TABLE TokenBlacklist (
    id INT AUTO_INCREMENT PRIMARY KEY,
    token VARCHAR(500) NOT NULL,
    blacklistedAt DATETIME DEFAULT CURRENT_TIMESTAMP
);
