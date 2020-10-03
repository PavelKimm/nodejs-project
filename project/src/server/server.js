const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const dbName = "mydb";
const url = "mongodb://localhost:27017/" + dbName;

mongoose.connect(
  url,
  {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) throw err;
    console.log("MongoDB connection established!");
  }
);

const app = express();
const bodyParserJSON = bodyParser.json();
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
app.use("/api/posts", require("./routes/postRoutes"));
app.use("/api", require("./routes/authRoutes"));
app.use(express.static("dist"));

app.listen(port, () => {
  console.log(`The server has started on port: ${port}`);
});
