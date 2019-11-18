const AWS = require('aws-sdk');
const axios = require('axios');
const uuid = require('uuid');
const multer = require('multer');

const multerOptions = {
  storage: multer.memoryStorage(),
  fileFilter(req, file, next) {
    const isPhoto = file.mimetype.startsWith('image/');
    if (isPhoto) {
      next(null, true);
    } else {
      next({ message: "That filetyle isn't allowed!" }, false);
    }
  },
  limits: { fileSize: 3000000 },
};

const upload = multer(multerOptions).single('photo');

function S3SignURL(req) {
  // make sure to specify signature version and region
  const s3 = new AWS.S3({
    accessKeyId: process.env.S3_ACCESS_KEY,
    secretAccessKey: process.env.S3_SECRET_KEY,
    signatureVersion: process.env.S3_SIGNATURE_VERSION,
    region: process.env.S3_REGION,
  });
  // generate folder/filename
  const key = `${req.user.id}/${uuid()}.jpeg`;

  return new Promise((resolve, reject) => {
    s3.getSignedUrl(
      'putObject',
      {
        Bucket: process.env.S3_BUCKET,
        ContentType: 'jpeg',
        Key: key,
      },
      (err, url) => {
        if (err) reject(err);
        resolve({ key, url });
      },
    );
  });
}

exports.uploadImageS3 = async (file, req, res, next) => {
  try {
    const result = await S3SignURL(req);
    req.body.s3 = result;
    await axios.put(result.url, file.buffer, {
      headers: {
        'Content-Type': file.mimetype,
      },
    });
  } catch (err) {
    res.send({ errors: err });
  }
  next();
};

exports.uploadImage = (req, res, next) => {
  upload(req, res, (err) => {
    const { file } = req;
    if (err) {
      res.status(500).send({ err });
    }
    if (file) {
      this.uploadImageS3(file, req, res, next)
        .then(() => {
          res.status(200).send({ s3: [req.body.s3] });
        })
        .catch((error) => {
          res.status(500).send({ error });
        });
    }
  });
};
