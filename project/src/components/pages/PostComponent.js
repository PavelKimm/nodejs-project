import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import Button from "@material-ui/core/Button";
import PropTypes from "prop-types";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import ThumbDownAltIcon from "@material-ui/icons/ThumbDownAlt";
import axios from "axios";

import { baseUrl } from "../constants";
import EditPostModal from "./EditPostModal";

const styles = {
  root: {
    background: (props) =>
      props.color === "red"
        ? "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)"
        : "linear-gradient(45deg, #00E400 30%, #00FC00 90%)",
    border: 0,
    borderRadius: 8,
    boxShadow: (props) =>
      props.color === "red"
        ? "0 3px 5px 2px rgba(255, 105, 135, .3)"
        : "0 3px 5px 2px rgba(33, 203, 243, .3)",
    color: "white",
    height: 34,
    padding: "0 10px",
    margin: 8,
    minWidth: "40px",
  },
};

const useStyles = makeStyles((theme) => ({
  container: {
    alignItems: "center",
    textAlign: "center",
    paddingTop: 10,
    fontSize: 18,
    // backgroundColor: "green",
  },
  fab: {
    margin: theme.spacing(2),
  },
  absolute: {
    position: "absolute",
    bottom: theme.spacing(2),
    right: theme.spacing(3),
  },
  post: { marginTop: 50 },
  postTitle: { textAlign: "center" },
  postContent: { textAlign: "center" },
  deleteButton: { textAlign: "right" },
  editButton: { textAlign: "right" },
  likesButton: { textAlign: "center" },
}));

function MyButtonRaw(props) {
  const { classes, color, ...other } = props;
  return <Button className={classes.root} {...other} />;
}
MyButtonRaw.propTypes = {
  classes: PropTypes.object.isRequired,
  color: PropTypes.oneOf(["green", "red"]).isRequired,
};
const MyButton = withStyles(styles)(MyButtonRaw);

function deletePost(_id) {
  if (window.confirm("Are you sure?")) {
    axios
      .delete(baseUrl + `/api/posts/` + _id)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        alert(error);
      });
  }
}

export default function PostComponent(props) {
  const classes = useStyles();
  const { post } = props;

  return (
    <div className={classes.post}>
      <div className={classes.postTitle}>{post.title}</div>
      <div className={classes.postContent}>{post.content}</div>
      <div className={classes.editButton}>
        <EditPostModal post={post} />
      </div>
      <div className={classes.deleteButton}>
        <Tooltip title="Delete">
          <IconButton aria-label="delete" onClick={() => deletePost(post._id)}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </div>
      <div className={classes.likesButton}>
        <React.Fragment>
          <MyButton color="green">
            <ThumbUpAltIcon />
          </MyButton>
          <MyButton color="red">
            <ThumbDownAltIcon />
          </MyButton>
        </React.Fragment>
      </div>
    </div>
  );
}