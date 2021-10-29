const admin = require("firebase-admin");
const serviceAccount = require("../at99-clothes-store-firebase-adminsdk-kl3kv-2c9ec70094.json");

// const configFirebase = require("./configFirebase");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://at99-clothes-store-default-rtdb.asia-southeast1.firebasedatabase.app",
    storageBucket: "at99-clothes-store.appspot.com",
});

// Cloud storage
const bucket = admin.storage().bucket();
const db = admin.database();

module.exports = {
    bucket,
    db,
};

// const firebaseDB = firebase.initializeApp(configFirebase.firebaseConfig);
// module.exports = firebaseDB;