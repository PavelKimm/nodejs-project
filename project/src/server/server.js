const express = require("express");
const bodyParser = require("body-parser");
const myRoutes = require("./route");

const bodyParserJSON = bodyParser.json();
const router = express.Router();

const app = express();
const port = 3000;

app.use(bodyParserJSON);
app.use("/api", router);
myRoutes(router);

// app.use(express.static("dist"));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
