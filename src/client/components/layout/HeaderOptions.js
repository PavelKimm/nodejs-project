import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import { fade, makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MailIcon from "@material-ui/icons/Mail";
import NotificationsIcon from "@material-ui/icons/Notifications";
import MoreIcon from "@material-ui/icons/MoreVert";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

import { logout, getUserData } from "../../api/authApi";
import { setIsAuthedFalseAC } from "../../redux/actions/isAuthed/isAuthedActions";
import {
  setUserDataStartAC,
  setUserDataSuccessAC,
  setUserDataErrorAC,
} from "../../redux/actions/userData/userDataActions";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  logoutButton: {
    marginLeft: "0.4em",
  },
}));

function HeaderOptions(props) {
  const history = useHistory();
  const classes = useStyles();
  const dispatch = useDispatch();
  const { userData, isAuthed } = props;

  useEffect(() => {}, []);

  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };
  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleRegister = () => {
    history.push("/register");
    handleMobileMenuClose();
  };
  const handleLogin = () => {
    history.push("/login");
    handleMobileMenuClose();
  };
  const handleLogout = () => {
    dispatch(setUserDataStartAC());
    dispatch(setUserDataSuccessAC({}));
    dispatch(setIsAuthedFalseAC());
    logout();
  };

  const renderMenu = (
    <div>
      {isAuthed ? (
        <div className={classes.sectionDesktop}>
          <IconButton aria-label="show 4 new mails" color="inherit">
            <Badge badgeContent={4} color="secondary">
              <MailIcon />
            </Badge>
          </IconButton>
          <IconButton aria-label="show 17 new notifications" color="inherit">
            <Badge badgeContent={17} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>

          <IconButton aria-label="account of current user" color="inherit">
            <AccountCircle />
          </IconButton>

          <MenuItem
            color="inherit"
            className={classes.logoutButton}
            onClick={handleLogout}
          >
            Logout
          </MenuItem>
        </div>
      ) : (
        <div className={classes.sectionDesktop}>
          <MenuItem onClick={handleRegister}>Register</MenuItem>
          <MenuItem onClick={handleLogin}>Login</MenuItem>
        </div>
      )}
    </div>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      {isAuthed ? (
        <div>
          <MenuItem>
            <IconButton aria-label="show 4 new mails" color="inherit">
              <Badge badgeContent={4} color="secondary">
                <MailIcon />
              </Badge>
            </IconButton>
            <p>Messages</p>
          </MenuItem>
          <MenuItem>
            <IconButton aria-label="show 11 new notifications" color="inherit">
              <Badge badgeContent={11} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <p>Notifications</p>
          </MenuItem>
          <MenuItem>
            <IconButton aria-label="account of current user" color="inherit">
              <AccountCircle />
            </IconButton>
            <p>Profile</p>
          </MenuItem>
          <MenuItem color="inherit" onClick={handleLogout}>
            <IconButton aria-label="account of current user" color="inherit">
              <ExitToAppIcon />
            </IconButton>
            <p>Logout</p>
          </MenuItem>
        </div>
      ) : (
        <div>
          <MenuItem onClick={handleRegister}>Register</MenuItem>
          <MenuItem onClick={handleLogin}>Login</MenuItem>
        </div>
      )}
    </Menu>
  );

  return (
    <nav>
      <div className={classes.sectionMobile}>
        <IconButton
          aria-label="show more"
          aria-controls={mobileMenuId}
          aria-haspopup="true"
          onClick={handleMobileMenuOpen}
          color="inherit"
        >
          <MoreIcon />
        </IconButton>
      </div>

      {renderMobileMenu}
      {renderMenu}
    </nav>
  );
}

const mapStateToProps = (state) => {
  return {
    isAuthed: state.isAuthedReducer.isAuthed,
    userData: state.userDataReducer,
  };
};

export default connect(mapStateToProps)(HeaderOptions);
