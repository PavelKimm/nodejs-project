import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";

import connectToMongo from "./api/connectToMongo";
import postRoutes from "./routes/postRoutes";
import authRoutes from "./routes/authRoutes";

const port = process.env.PORT || 5000;

dotenv.config();
connectToMongo();

const app = express();
const bodyParserJSON = bodyParser.json();

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
app.use(express.static("dist"));

// routes
app.use("/api/posts", postRoutes);
app.use("/api", authRoutes);

app.listen(port, () => {
  console.log(`The server has started on port: ${port}`);
});
