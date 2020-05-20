import React, { useState } from "react";
import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "../../redux/user/user.selector";
import { logoutCurrentUser } from "../../redux/user/user.action";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import CreateEditUser from "../createEditUser/CreateEditUser";
import { showAlert } from "../../redux/alerts/alert.action";

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

function Logout({ currentUser, logoutCurrentUser, showAlert }) {
  const [open, setOpen] = useState(false);
  const classes = useStyles();

  // Create User Form Handle Close
  const closeDialog = () => {
    setOpen(false);
  };

  const openDialog = () => {
    setOpen(true);
  };

  const handleLogout = () => {
    logoutCurrentUser();
    showAlert({ msg: "Logout Successfull", alertType: "success" });
  };

  return (
    <div>
      <Card className={classes.root}>
        <div className="text-right">
          <CardContent>
            <AccountCircleIcon />

            <Typography variant="h5" component="h2">
              {currentUser.currentUser}
            </Typography>
          </CardContent>
        </div>
        <div className="flex justify-between">
          <CardActions>
            <Button
              variant="contained"
              color="primary"
              size="small"
              startIcon={<ExitToAppIcon />}
              onClick={openDialog}
            >
              ADD USER
            </Button>
          </CardActions>
          <CardActions>
            <Button
              variant="contained"
              color="primary"
              size="small"
              startIcon={<ExitToAppIcon />}
              onClick={handleLogout}
            >
              Logout
            </Button>
          </CardActions>
        </div>
        {/* Create New User Form */}
        <CreateEditUser open={open} close={closeDialog} />
      </Card>
    </div>
  );
}

// Fetch Global/Redux States
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

// Call Global/Redux Actions
const mapDispatchToProps = (dispatch) => ({
  logoutCurrentUser: (user) => dispatch(logoutCurrentUser()),
  showAlert: (alert) => dispatch(showAlert(alert)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Logout);
