import React, { useState, useEffect } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { connect } from "react-redux";
import EditIcon from "@material-ui/icons/Edit";
import VisibilityIcon from "@material-ui/icons/Visibility";
import {
  viewUserDetail,
  deleteUser,
} from "../../../../redux/allusers/allUser.action";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import Tooltip from "@material-ui/core/Tooltip";
import CreateEditUser from "../../../createEditUser/CreateEditUser";
import { showAlert } from "../../../../redux/alerts/alert.action";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "space-between",
  },
  details: {
    display: "flex",
    flexDirection: "column",
  },
  content: {
    flex: "1 0 auto",
  },
  cover: {
    width: 151,
  },
  controls: {
    display: "flex",
    alignItems: "center",
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  playIcon: {
    height: 38,
    width: 38,
  },
}));

const UserItem = ({ user, viewUserDetail, deleteUser, showAlert }) => {
  const [open, setOpen] = useState(false);
  const [id, setId] = useState(null);
  const classes = useStyles();
  const theme = useTheme();

  // Create User Form Handle Close
  const closeDialog = () => {
    setId(null);
    setOpen(null);
  };

  const openDialog = (id) => {
    setId(id);
  };

  useEffect(() => {
    if (id !== null) {
      setOpen(true);
    }
  }, [id]);

  const handleViewDetail = (userID) => {
    viewUserDetail(userID);
  };

  const handleDeleteUser = (userID) => {
    deleteUser(userID);
    showAlert({ msg: "User Deleted Successfully", alertType: "success" });
  };

  return (
    <Card className={classes.root}>
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography variant="subtitle1" color="textSecondary">
            {user.login}
          </Typography>
        </CardContent>
        <div className={classes.controls}>
          <div>
            <Tooltip title="Delete">
              <IconButton
                aria-label="delete"
                onClick={() => handleDeleteUser(user.id)}
              >
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </div>
          <div className="mx-3">
            <Tooltip title="Edit">
              <IconButton aria-label="edit" onClick={() => openDialog(user.id)}>
                <EditIcon />
              </IconButton>
            </Tooltip>
          </div>
          <div>
            <Tooltip title="View Detail">
              <IconButton
                aria-label="view detail"
                onClick={() => handleViewDetail(user.id)}
              >
                <VisibilityIcon />
              </IconButton>
            </Tooltip>
          </div>
        </div>
      </div>
      <CardMedia
        className={classes.cover}
        image={
          user.avatar_url !== ""
            ? user.avatar_url
            : "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQYb3FsyNebJOI8T50ua17HlUMj4M_0hGewdR2yeshDmACc_Tfg&usqp=CAU"
        }
        title="Live from space album cover"
      />
      {/* Edit User Form */}
      <CreateEditUser open={open} close={closeDialog} edit={true} id={id} />
    </Card>
  );
};

// Call Global/Redux Actions
const mapDispatchToProps = (dispatch) => ({
  viewUserDetail: (userID) => dispatch(viewUserDetail(userID)),
  deleteUser: (userID) => dispatch(deleteUser(userID)),
  showAlert: (alert) => dispatch(showAlert(alert)),
});

export default connect(null, mapDispatchToProps)(UserItem);
