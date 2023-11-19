const express = require("express");
const app = express();
const mongoose = require("mongoose");
const videoRoute = require("./routes");
const { errorHandler } = require("./middlewares/error");
// const express = require("express");
// const compression = require("compression");
const cors = require("cors");
const httpStatus = require("http-status");
// const routes = require("./routes/v1");
// const { errorHandler } = require("./middlewares/error");
const ApiError = require("./utils/ApiError");
// const { jwtStrategy } = require("./config/passport");
const helmet = require("helmet");
// const passport = require("passport");

const PORT = 8082;

const DB_URI = "mongodb://127.0.0.1:27017/xflix";

// set security HTTP headers - https://helmetjs.github.io/
app.use(helmet());

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// gzip compression
// app.use(compression());

// enable cors
app.use(cors());
app.options("*", cors());

// mongoose
//   .connect(`${DB_URI}`)
//   .then(() => console.log("Connected to DB at", DB_URI))
//   .catch((e) => console.log("Failed to connect to DB", e));


// app.listen(PORT, () => {
//   console.log("Listening at express", PORT);
// });

// app.get('/v1/videos',(req,res)=>{
//   res.send('<h1>hello hi</h1>')
// })


app.use('/v1',videoRoute);

app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, "Not found"));
});

app.use(errorHandler);

module.exports = app;