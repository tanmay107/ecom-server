
var admin = require("firebase-admin");

var serviceAccount = require("./fir-auth-ecommerce-9b085-firebase-adminsdk-7y6b9-fe01942bb7.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://fir-auth-ecommerce-9b085-default-rtdb.asia-southeast1.firebasedatabase.app"
});
