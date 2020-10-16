import express from "express";
import session from "express-session";
// import connectRedis from "connect-redis";
// import Redis from "ioredis";
import React from "react";
import ReactDOMServer from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { ServerStyleSheets, ThemeProvider } from "@material-ui/core/styles";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import http from "http";
import socketIo from "socket.io";
import randomColor from "randomcolor";

import { REDIS_OPTIONS, SESSION_OPTIONS, APP_PORT } from "./constants";
import connectToMongo from "./api/connectToMongo";
import postRoutes from "./routes/postRoutes";
import authRoutes from "./routes/authRoutes";
import App from "../client/App";
import theme from "../theme";
import store from "../client/redux/store";

import Message from "./models/messageModel";

function renderFullPage(html, css) {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
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
          <StaticRouter location={req.url} context={{}}>
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

// const RedisStore = connectRedis(session);
// const client = new Redis(REDIS_OPTIONS);

const app = express();

// app.use(
//   session({
//     ...SESSION_OPTIONS,
//     store: new RedisStore({ client }),
//   })
// );

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
app.use(express.static("build"));

// routes
app.use("/api/posts", postRoutes);
app.use("/api", authRoutes);

// app.use(handleRender);

app.get("*", (req, res) => {
  handleRender(req, res);
});

//
// socketIO
const server = http.createServer(app);
const io = socketIo(server, { serveClient: false });
const users = [];

//listen on every connection
io.on("connection", (socket) => {
  console.log("New user connected", socket.id);

  // get online user list
  socket.emit("get_users", users);
  socket.on("get_users", () => {
    socket.emit("get_users", users);
  });

  // user connected
  socket.on("user_connected", (username) => {
    function usernameWasUpdated(user, index, array) {
      if (user.id === socket.id) user.username = username;
      return user.id === socket.id;
    }

    if (users.some(usernameWasUpdated)) {
      io.emit("get_users", users);
    } else {
      const color = randomColor();
      users.push({ id: socket.id, username: username, color: color });
      io.emit("user_connected", { users: users, newUser: username });
    }
  });

  //listen on new_message
  socket.on("new_message", async (data) => {
    console.log(data);

    const messageData = {
      sender: data.sender,
      message: data.message,
      timestamp: Date.now(),
    };
    io.emit("new_message", messageData);

    const newMessage = new Message(messageData);
    await newMessage.save();
  });

  //Disconnect
  socket.on("disconnect", (data) => {
    console.log(" User disconnected", socket.id);
    users.map((user, index) => {
      if (user.id === socket.id) users.splice(index, 1);
    });
    io.emit("get_users", users);
  });
});

server.listen(APP_PORT, () => console.log(`Listening on port ${APP_PORT}`));
// server.listen(port, "0.0.0.0", () => console.log(`Listening on port ${port}`));
