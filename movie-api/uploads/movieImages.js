import multer from 'multer'
// Define where to store the images and how to name them
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads'); // Ensure this folder exists: public/uploads
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname); // Save as: timestamp-originalname.jpg
  }
});

const movieImages = multer({storage});
export default movieImages;