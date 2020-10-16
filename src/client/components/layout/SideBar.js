import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ChatIcon from "@material-ui/icons/Chat";
import InfoIcon from "@material-ui/icons/Info";
import LinkIcon from "@material-ui/icons/Link";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  list: {
    width: 200,
  },
  fullList: {
    width: "auto",
  },
  active: {
    color: "gold",
  },
});

export default function SideBar(props) {
  const classes = useStyles();
  const sidebarLinkStyle = { color: "darkGrey" };

  const { toggleDrawerOpened, isDrawerOpened } = props;
  return (
    <div>
      <Drawer anchor="left" open={isDrawerOpened} onClose={toggleDrawerOpened}>
        <List className={classes.list}>
          <Link
            to="/about"
            onClick={toggleDrawerOpened}
            style={sidebarLinkStyle}
          >
            <ListItem button>
              <ListItemIcon>
                <InfoIcon />
              </ListItemIcon>
              <ListItemText primary="About" />
            </ListItem>
          </Link>
          <Link
            to="/chat"
            onClick={toggleDrawerOpened}
            style={sidebarLinkStyle}
          >
            <ListItem button>
              <ListItemIcon>
                <ChatIcon />
              </ListItemIcon>
              <ListItemText primary="Chat" />
            </ListItem>
          </Link>
          <Link
            to="/contacts"
            onClick={toggleDrawerOpened}
            style={sidebarLinkStyle}
          >
            <ListItem button>
              <ListItemIcon>
                <LinkIcon />
              </ListItemIcon>
              <ListItemText primary="Contacts" />
            </ListItem>
          </Link>
        </List>
      </Drawer>
    </div>
  );
}
