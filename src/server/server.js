import express from "express";
import session from "express-session";
import connectRedis from "connect-redis";
import Redis from "ioredis";
import React from "react";
import ReactDOMServer from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { ServerStyleSheets, ThemeProvider } from "@material-ui/core/styles";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";

import { REDIS_OPTIONS, SESSION_OPTIONS, APP_PORT } from "./constants";
import connectToMongo from "./api/connectToMongo";
import postRoutes from "./routes/postRoutes";
import authRoutes from "./routes/authRoutes";
import App from "../client/App";
import theme from "../theme";
import store from "../client/redux/store";

function renderFullPage(html, css) {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <title>React Project</title>
        <link rel="stylesheet" href="style.css">
        <style id="jss-server-side">${css}</style>
      </head>
      <body style="margin: 0">
        <div id="react-root">${html}</div>
        <script src="bundle.js"></script></body>
      </body>
    </html>
  `;
}

function handleRender(req, res) {
  const sheets = new ServerStyleSheets();

  const html = ReactDOMServer.renderToString(
    sheets.collect(
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <StaticRouter>
            <App />
          </StaticRouter>
        </Provider>
      </ThemeProvider>
    )
  );
  // Grab the CSS from the sheets.
  const css = sheets.toString();
  // Send the rendered page back to the client.
  res.send(renderFullPage(html, css));
}

dotenv.config();
connectToMongo();
const bodyParserJSON = bodyParser.json();

const RedisStore = connectRedis(session);
const client = new Redis(REDIS_OPTIONS);

const app = express();

app.use(
  session({
    ...SESSION_OPTIONS,
    store: new RedisStore({ client }),
  })
);

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

// app.use(handleRender);

app.get("*", (req, res) => {
  handleRender(req, res);
});

app.listen(APP_PORT, () => {
  console.log(`The server has started on port: ${APP_PORT}`);
});
