import multer from 'multer';

const fs = require('fs');
const path = require('path');
export const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    try {
      fs.mkdirSync(path.join(process.cwd(), 'my-uploads'));
    } catch (e) {}
    cb(null, path.join(process.cwd(), 'my-uploads'));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix =
      Date.now() +
      '-' +
      Math.round(Math.random() * 1e9) +
      '-' +
      file.originalname;
    cb(null, file.fieldname + '-' + uniqueSuffix);
  },
});
