const mongoose = require("mongoose");
const app = require("./app");
let server;

// const PORT = 8082;


const DB_URI = "mongodb://127.0.0.1:27017/xflix";

mongoose
  .connect(`${DB_URI}`)
  .then(() => console.log("Connected to DB at", DB_URI))
  .catch((e) => console.log("Failed to connect to DB", e));


app.listen(8082, () => {
  console.log("Listening at express", 8082);
});