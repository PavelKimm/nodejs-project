const express = require("express");
const bodyParser = require("body-parser");
const routes = require("./routes");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const dbName = "mydb";
const url = "mongodb://localhost:27017/" + dbName;

mongoose.connect(url, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  // we're connected!
});

const bodyParserJSON = bodyParser.json();
const router = express.Router();

const app = express();
const port = process.env.PORT || 5000;

// CORS settings
// var whitelist = ["http://localhost:8001", "*"];
// var corsOptions = {
//   origin: function (origin, callback) {
//     if (whitelist.indexOf(origin) !== -1) {
//       callback(null, true);
//     } else {
//       callback(new Error("Not allowed by CORS"));
//     }
//   },
// };
// app.use(cors(corsOptions));
app.use(cors());

app.use(bodyParserJSON);
app.use("/api", router);
routes(router);

// app.use(express.static("dist"));

app.listen(port, () => {
  console.log(`The server has started on port: ${port}`);
});
