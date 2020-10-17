import React, { useState, useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import axios from "axios";
import moment from "moment";

import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Form from "react-validation/build/form";
import CheckButton from "react-validation/build/button";

import socketIOClient from "socket.io-client"; //ws
import { baseUrl } from "../../constants";

const useStyles = makeStyles((theme) => ({
  container: {
    alignItems: "center",
    textAlign: "center",
    fontWeight: "bold",
    paddingTop: 10,
    fontSize: 18,
    marginBottom: "80px",
  },

  textarea: {
    minWidth: "340px",
    width: "40vw",
    backgroundColor: "#fffde7",
    border: "1px solid #ffefa2",
    overflow: "hidden",
    height: "276px",
    margin: "auto",
    overflowY: "auto",
    display: "flex",
    flexDirection: "column-reverse",
  },

  messageList: {
    textAlign: "left",
    margin: "30px 40px",
  },

  separateMessage: {
    display: "inline-block",
    width: "100%",
    "&:not(:first-child)": { marginTop: "25px" },
  },

  sender: {
    fontSize: "14px",
    color: "#848484",
    wordBreak: "break-all",
  },
  messageText: {
    float: "left",
    color: "#a20202",
    wordBreak: "break-all",
  },

  datetime: {
    fontSize: "14px",
    float: "right",
    color: "#100da5",
  },

  messageInput: {
    display: "block",
    width: "100%",
    maxWidth: "380px",
    margin: "15px auto 5px",
  },
  sendMessageButton: {
    // [theme.breakpoints.down("sm")]: {},
    [theme.breakpoints.up("sm")]: {
      marginRight: "18.5vw",
    },
    display: "block",
    float: "right",
  },

  usernameInput: {
    display: "inline-block",
    width: "220px",

    // margin: "",
    // marginRight: "10px",
  },
}));

function ChatPage(props) {
  const classes = useStyles();

  const { isAuthed, userData } = props;

  const [socket, setSocket] = useState();
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState("");
  const [usernameIsSet, setUsernameIsSet] = useState(false);

  function onChangeMessage(e) {
    setMessage(e.target.value);
  }
  function onChangeUsername(e) {
    setUsername(e.target.value);
  }

  function handleSetUsername(e) {
    e.preventDefault();
    if (username.trim()) {
      setUsernameIsSet(true);
      socket.emit("user_connected", username);
    }
  }

  function sendMessage(e) {
    e.preventDefault();
    if (message.trim()) {
      if (userData.displayName) {
        socket.emit("new_message", {
          sender: userData.displayName,
          message: message,
        });
      } else {
        socket.emit("new_message", { sender: username, message: message });
      }
      setMessage("");
    }
  }

  useEffect(() => {
    const socket_ = socketIOClient("https://harmist.space");

    socket_.on("fetch_message", (data) => {
      setMessages(data);
    });

    socket_.on("new_message", (data) => {
      messages.push(data);
      setMessages([...messages]);
    });

    socket_.on("get_users", (users) => {
      setUsers(users);
    });
    socket_.emit("get_users");

    socket_.on("user_connected", ({ users, newUser }) => {
      socket_.emit("get_users");
      setUsers(users);

      console.log(newUser);
    });

    setSocket(socket_);
  }, []);

  return (
    <Container className={classes.container} maxWidth="md">
      {!(usernameIsSet || isAuthed) ? (
        <form onSubmit={handleSetUsername} className={classes.form}>
          <h1 className={classes}>Choose username</h1>
          <TextField
            value={username}
            onChange={onChangeUsername}
            className={classes.usernameInput}
            label="Username..."
            variant="outlined"
            inputProps={{
              style: {
                height: "46px",
                padding: "5px 14px",
              },
            }}
            InputLabelProps={{
              style: {
                paddingLeft: "17px",
                paddingBottom: "10px",
                marginBottom: "10px",
              },
            }}
          />
          <Button
            style={{ height: "56px" }}
            variant="outlined"
            type="submit"
            color="primary"
          >
            Choose
          </Button>
        </form>
      ) : (
        <div className={classes}>
          <div className={classes}>
            <header>
              <h2>Online Users</h2>
            </header>
          </div>
          <div>
            {/* <!--Online users goes here--> */}
            <ul>
              {users.map((user, index) => (
                <li key={index} style={{ color: user.color }}>
                  {user.username}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* <!--Chat Wrapper --> */}
      <div className={classes}>
        <div className={classes}>
          <header>
            <h1>Chat</h1>
          </header>
        </div>
        <form onSubmit={sendMessage} className={classes}>
          {!(usernameIsSet || isAuthed) && (
            <p style={{ color: "red" }}>Please, log in or provide username!</p>
          )}

          <div className={classes.textarea}>
            <ul className={classes.messageList}>
              {messages.map((msg, index) => (
                <li className={classes.separateMessage} key={index}>
                  <div className={classes.sender}>{msg.sender}</div>
                  <div className={classes.messageText}>{msg.message}</div>
                  <div className={classes.datetime}>
                    {moment
                      .unix(Math.floor(msg.timestamp / 1000))
                      .format("hh:mm MM/DD/YYYY")}
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <input
            disabled={!(usernameIsSet || userData.displayName)}
            className={classes.messageInput}
            type="text"
            value={message}
            onChange={onChangeMessage}
          />
          {usernameIsSet || userData.displayName ? (
            <Button
              className={classes.sendMessageButton}
              type="submit"
              variant="outlined"
              color="primary"
            >
              Send message
            </Button>
          ) : (
            <Button
              className={classes.sendMessageButton}
              variant="outlined"
              disabled
            >
              Send message
            </Button>
          )}
        </form>
      </div>
    </Container>
  );
}

function mapStateToProps(state) {
  return {
    isAuthed: state.isAuthedReducer.isAuthed,
    userData: {
      id: state.userDataReducer.id,
      displayName: state.userDataReducer.displayName,
    },
  };
}

export default connect(mapStateToProps)(ChatPage);
