//Node.js

var admin = require("firebase-admin");

var serviceAccount = require("path/to/serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://gps-tracking-41716-default-rtdb.asia-southeast1.firebasedatabase.app"
});