import React, { Component } from "react";
import { createStructuredSelector } from "reselect";
import { selectAllUsersList } from "../../../../redux/allusers/allUser.selector";
import { connect } from "react-redux";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import GitHubIcon from "@material-ui/icons/GitHub";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";

export class UserDetail extends Component {
  state = {
    selectedUser: null,
  };
  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      let selectedUser = null;
      if (this.props.usersList.viewDetailUserID !== null) {
        selectedUser = this.props.usersList.usersList.filter(
          (user) => user.id === this.props.usersList.viewDetailUserID
        )[0];
      }
      this.setState({
        selectedUser,
      });
    }
  }

  handleGoToGithub = (url) => {
    window.open(url, "_blank");
  };
  render() {
    const user = this.state.selectedUser;
    if (!user) {
      return null;
    }
    return (
      <div>
        <Card>
          <div>
            <img
              className="w-full"
              src={
                user.avatar_url !== ""
                  ? user.avatar_url
                  : "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQYb3FsyNebJOI8T50ua17HlUMj4M_0hGewdR2yeshDmACc_Tfg&usqp=CAU"
              }
              title="Live from space album cover"
            />
          </div>
          <div>
            <CardContent>
              <Typography component="h5" variant="h5">
                {user.login}
              </Typography>
              <Tooltip title="View on Github">
                <IconButton
                  aria-label="view on github"
                  onClick={() => this.handleGoToGithub(user.html_url)}
                >
                  <GitHubIcon />
                </IconButton>
              </Tooltip>
            </CardContent>
            <div></div>
          </div>
        </Card>
      </div>
    );
  }
}

// Fetch Global/Redux States
const mapStateToProps = createStructuredSelector({
  usersList: selectAllUsersList,
});

export default connect(mapStateToProps)(UserDetail);
