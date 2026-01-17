const multer = require('multer');
const path = require('path');
const fs = require('fs');


  

const createStorage = (destination, fileFilter,url) => {
    return multer.diskStorage({
        destination: function (req, file, cb) {
          // Get the ID from the request object (assuming it's available as req.body.postId)
          const postId = req.params.propId;
          
          // Define the destination directory path
          const destinationDir = path.join(destination, postId.toString());
      
          // Check if the destination directory exists, create it if it doesn't
          if (!fs.existsSync(destinationDir)) {
            fs.mkdirSync(destinationDir, { recursive: true });
          }
      
          // Set the destination directory
          cb(null, destinationDir);
        },
        filename: function (req, file, cb) {
          // Generate a unique filename
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
          const fileExtension = path.extname(file.originalname);
          const filename =  'image-' + uniqueSuffix + fileExtension
      
            req.image = `/${url}/${req.params.propId}/${filename}` ;
          
          // Set the filename
          cb(null, 'image-' + uniqueSuffix + fileExtension);
        }
      });
};

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/webp') {
        cb(null, true);
    } else {
        cb(new Error("The file is not of image format!"), false);
    }
};

const file_Filter = (req, file, cb) => {
    if (file.mimetype === 'video/mp4' || file.mimetype === 'video/gif') {
        cb(null, true);
    } else {
        cb(new Error("The file is not of video format!"), false);
    }
};

exports.upload_prop = multer({ storage: createStorage('public/projects', fileFilter,"projects"), fileFilter: fileFilter });
exports.upload_blog = multer({ storage: createStorage('public/blog', fileFilter,"blog"), fileFilter: fileFilter });

