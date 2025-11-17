CREATE SCHEMA SongDB;
use SongDB;

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
    UserID INT PRIMARY KEY,
    UserName VARCHAR(100) NOT NULL,
    Email VARCHAR(100) UNIQUE NOT NULL,
    Country VARCHAR(100),
    JoinDate DATE
);

CREATE TABLE Playlist (
PlaylistID INT PRIMARY KEY,
UserID INT,
PlaylistName VARCHAR(100),
DateCreated DATE,
FOREIGN KEY (UserID) REFERENCES UserAccount(UserID)
);

CREATE TABLE PlaylistSong (
PlaylistID INT,
SongID INT,
DateAdded DATE,
PRIMARY KEY (PlaylistID, SongID),
FOREIGN KEY (PlaylistID) REFERENCES Playlist(PlaylistID),
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
(6, 'Burna Boy', 8, 428, 30000000, 22000000);

INSERT INTO Song VALUES
(201, 'Anti-Hero', 1, '00:03:20', 1200000000, 'Pop', '2022-10-21'),
(202, 'Seven', 2, '00:03:05', 650000000, 'Kpop', '2023-07-14'),
(203, 'Just Pretend', 3, '00:03:58', 98000000, 'Metal', '2022-11-03'),
(204, 'I Miss You, I’m Sorry', 4, '00:03:24', 210000000, 'Indie Pop', '2020-02-21'),
(205, 'Blinding Lights', 5, '00:03:20', 3700000000, 'R&B', '2019-11-29'),
(206, 'Last Last', 6, '00:02:53', 540000000, 'Afrobeats', '2022-05-13');

INSERT INTO UserAccount VALUES
(1, 'Najin' , 'najin.seifi@ontariotechu.net','Iran', '2023-03-01'),
(2, 'Kaira', 'kaira.subramaniam@ontariotechu.net' , 'Antarctica', '2022-08-18'),
(3, ' Kyle' , 'Kyle.siwazalian@ontariotechu.net', 'Poland', '2024-12-12'),
(4, 'Mesoma', 'mesoma@ontariotechu.net', 'Canada', '2025-06-01'),
(5, 'Vlad', 'Vlad@ontariotechu.net', 'Romania', '2021-06-07'),
(6, 'Colton', 'Colton@ontariotechu.net', 'Canada', '2025-06-20');

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

USE SongDB;
SELECT * FROM SongDB.Artist; 
SELECT * FROM SongDB.Song; 
SELECT * FROM SongDB.UserAccount; 
SELECT * FROM SongDB.Playlist; 
SELECT * FROM SongDB.PlaylistSong; 
SELECT * FROM SongDB.UserHistory; 

ALTER TABLE UserAccount
ADD Password VARCHAR(255) DEFAULT 'temp';
UPDATE UserAccount SET Password = 'temp';

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
MODIFY PlaylistID INT NOT NULL AUTO_INCREMENT;

ALTER TABLE PlaylistSong
ADD CONSTRAINT playlistSong_ibfk_1
FOREIGN KEY (PlaylistID)
REFERENCES Playlist(PlaylistID)
ON DELETE CASCADE;