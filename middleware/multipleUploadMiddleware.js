const util = require("util");
const multer = require("multer");

const storage = multer.memoryStorage();

const uploadSingleFile = multer({ storage: storage }).single("file");
const uploadMultipleFile = multer({ storage: storage }).array("files", 20);

// Mục đích của util.promisify() là để bên controller có thể dùng async-await để gọi tới middleware này
const singleUploadMiddleware = util.promisify(uploadSingleFile);
const multipleUploadMiddleware = util.promisify(uploadMultipleFile);

module.exports = { singleUploadMiddleware, multipleUploadMiddleware };