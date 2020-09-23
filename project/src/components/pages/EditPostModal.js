import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import axios from "axios";

import { baseUrl } from "../constants";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    width: "50%",
    height: 400,
  },

  postCreationForm: {
    margin: theme.spacing(1),
    textAlign: "center",
    width: "95%",
  },
  idTextField: {},
  titleTextField: { marginTop: 50, width: "50%" },
  contentTextField: { marginTop: 50, width: "50%" },
  button: { marginTop: 50 },
}));

export default function EditPostModal(props) {
  const classes = useStyles();

  const { post, editPost } = props;

  const [isModalOpened, setIsModalOpened] = useState(false);
  const [postData, setPostData] = useState({
    _id: post._id,
    title: post.title,
    content: post.content,
  });

  const handleOpen = () => {
    setIsModalOpened(true);
  };

  const handleClose = () => {
    setIsModalOpened(false);
  };

  const handleChange = (fieldName) => (event) => {
    const newPostData = { ...postData };
    newPostData[fieldName] = event.target.value;
    setPostData(newPostData);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    editPost(postData);
    handleClose();
  };

  return (
    <div>
      <div>
        <Tooltip title="Edit">
          <IconButton aria-label="edit" onClick={handleOpen}>
            <EditIcon />
          </IconButton>
        </Tooltip>

        {/* <Tooltip title="You don't have permission to do this">
          <span>
            <Button disabled>Create post</Button>
          </span>
        </Tooltip> */}

        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={isModalOpened}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={isModalOpened}>
            <div className={classes.paper}>
              <form
                className={classes.postCreationForm}
                noValidate
                autoComplete="off"
                onSubmit={handleSubmit}
              >
                <div>
                  <TextField
                    className={classes.titleTextField}
                    id="standard-basic"
                    label="Title"
                    type="text"
                    name="title"
                    onChange={handleChange("title")}
                    defaultValue={post.title}
                  />
                </div>
                <div>
                  <TextField
                    className={classes.contentTextField}
                    id="outlined-textarea"
                    label="Content"
                    type="text"
                    name="content"
                    multiline
                    variant="outlined"
                    onChange={handleChange("content")}
                    defaultValue={post.content}
                  />
                </div>
                <Button className={classes.button} type="submit">
                  Save
                </Button>
              </form>
            </div>
          </Fade>
        </Modal>
      </div>
    </div>
  );
}
