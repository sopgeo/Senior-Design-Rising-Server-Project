const multer = require('multer');
const path = require('path');
const db = require('../models');
const File = db.files;
const fs = require('fs');
const Projects = db.projects

// Define the storage without setting the destination yet
  const storage = multer.diskStorage({
    filename: function(req, file, cb) {
      cb(null, `${file.originalname}`);
    },
    destination: (req, file, cb) => {
        const destPath = path.join(__dirname, '../../frontend/public/Files/Temp');
        fs.mkdirSync(destPath, { recursive: true }); // Ensure directory exists
        cb(null, destPath);
    }
  });
  
  // Initialize multer without setting the destination
  const upload = multer({ storage: storage });
  
  const uploadFile = (req, res) => {
    // Call multer as middleware here, inside the route handler
    upload.single('pdf')(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        return res.status(500).send({ message: err.message });
      } else if (err) {
        return res.status(500).send({ message: err.message || 'File upload error.' });
      }
  
      // Now that we have access to text fields in req.body, we can define the destination directory
      const year = req.body.year;
      const semester = req.body.semester;
      const projectId = req.body.projectId;
      console.log(req.file.path)
      const dir = path.join(__dirname, `../../frontend/public/Files/${year}/${semester}/Projects/${projectId}`);
      console.log(dir)
  
      // Create directory if it doesn't exist
      fs.mkdirSync(dir, { recursive: true });
  
      // Move the file to the correct destination
      const finalPath = path.join(dir, req.file.originalname);
      fs.rename(req.file.path, finalPath, (err) => {
        if (err) {
          return res.status(500).send({ message: 'Error moving the file.' });
        }
  
        // File has been moved, now save the file metadata to the database
        const newFile = File.create({
            project_id: req.body.projectId,
            filename: req.file.filename,
            filetype: req.file.mimetype,
            filesize: req.file.size,
            filepath: `Files/${year}/${semester}/Projects/${projectId}/` + req.file.originalname,
            type: "final_document"
        });

        Projects.update({documents: 1}, {where: {project_id: req.body.projectId}})
  
        res.send({ message: 'File uploaded successfully', path: finalPath });
      });
    });
  };

  module.exports = {
    uploadFile
  };


