const multer = require('multer');
const crypto = require('crypto');
const GridFsStorage = require('multer-gridfs-storage');
const path = require('path');
const ErrorResponse = require("../model/statusResponse/ErrorResponse");

const storage = new GridFsStorage({
    url: "mongodb+srv://qtd1999:QTD267qtd@cluster0.cp94j.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    file: (req, file) => {
        console.log("---------------------------------");
        console.log(file);
        return new Promise((resolve, reject) => {
            crypto.randomBytes(16, (err, buf) => {
                if (err) {
                    return reject(err);
                }
                const filename = buf.toString('hex') + path.extname(file.originalname);
                const fileInfo = {
                    filename: filename,
                    bucketName: process.env.MONGO_BUCKET
                };
                resolve(fileInfo);
            });
        });
    }
});

const mongoUpload = multer({ storage });

module.exports = mongoUpload;