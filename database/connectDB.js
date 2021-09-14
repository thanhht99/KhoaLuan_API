const mongoose = require("mongoose");
const colors = require("colors");
const Grid = require("gridfs-stream");
const ErrorResponse = require("../model/statusResponse/ErrorResponse");

class ConnectMongo {
    constructor() {
        this.gfs = null;
        this.gfs2 = null;
    }

    // mongoDB = async() => {
    //     await mongoose
    //         .connect(process.env.MONGODB_URI, {
    //             useNewUrlParser: true,
    //             useUnifiedTopology: true,
    //             useCreateIndex: true,
    //             useFindAndModify: false,
    //         })
    //         .then(() => console.log(`DB MongoDB is connected`.yellow))
    //         .catch((err) => {
    //             console.error("Error while connecting to DB", err);
    //             return next(new ErrorResponse(502, "Bad Gateway."));
    //         });
    //     return mongoose;
    // };

    static async getConnect() {
        await mongoose
            .connect(process.env.MONGODB_URI, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex: true,
                useFindAndModify: false,
            })
            .then(() => console.log(`DB MongoDB is connected`.yellow))
            .catch((err) => {
                console.error("Error while connecting to DB", err);
            });

        const conn = mongoose.connection;

        // conn.once("open", () => {
        //     this.gfs = new mongoose.mongo.GridFSBucket(conn.db, {
        //         bucketName: process.env.MONGO_BUCKET
        //     })
        // })

        conn.once("open", () => {
            this.gfs = new mongoose.mongo.GridFSBucket(conn.db, {
                bucketName: process.env.MONGO_BUCKET,
            });

            this.gfs2 = Grid(conn.db, mongoose.mongo);
            this.gfs2.collection(process.env.MONGO_BUCKET);
        });
    }
}
exports.ConnectMongo = ConnectMongo;