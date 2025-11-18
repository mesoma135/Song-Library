const db = require('../config/db');
const { Parser } = require("json2csv");
const PDFDocument = require("pdfkit");

//export playlist data to CSV file
exports.exportPlaylistsCSV = async (req, res) => {
    try {
      const [rows] = await db.promise().query(
        "SELECT PlaylistID, PlaylistName, DateCreated FROM Playlist WHERE UserID = ?",
        [req.user.userId]
      );
  
      const json2csvParser = new Parser();
      const csv = json2csvParser.parse(rows);
  
      res.header("Content-Type", "text/csv");
      res.attachment("playlists.csv");
      res.send(csv);
  
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Could not export CSV" });
    }
  };

  //Export playlist data to PDF file
exports.exportPlaylistsPDF = async (req, res) => {
  try{
    const [rows] = await db.promise().query("SELECT * FROM Playlist WHERE UserID = ?",[req.user.userId]);

    const doc = new PDFDocument();

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "attachment; filename=playlists.pdf");

    doc.pipe(res);

    doc.fontSize(20).text("Your Playlists", { underline: true });
    doc.moveDown();

    rows.forEach((playlist, index) => {
      doc
        .fontSize(14)
        .text(`${index + 1}. ${playlist.Name} (ID: ${playlist.PlaylistID})`);
    });

    doc.end();
  } 
  catch (err) {
    console.error(err);
    res.status(500).json({ error: "Could not export PDF" });
  }
};

