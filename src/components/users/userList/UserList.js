import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchAllUsers } from "../../../redux/allusers/allUser.action";
import { createStructuredSelector } from "reselect";
import { selectAllUsersList } from "../../../redux/allusers/allUser.selector";
import LinearProgress from "@material-ui/core/LinearProgress";
import UserItem from "./userItem/UserItem";

export class UserList extends Component {
  componentDidMount() {
    this.props.fetchAllUsers();
  }
  render() {
    if (this.props.usersList.isLoading) {
      return (
        <div>
          <LinearProgress />
        </div>
      );
    }
    if (
      this.props.usersList.usersList &&
      this.props.usersList.usersList.length !== 0
    ) {
      return (
        <div>
          {this.props.usersList.usersList.map((user, i) => {
            if (i >= 4) {
              return;
            }
            return (
              <div className="my-8" key={user.id}>
                <UserItem user={user} />
              </div>
            );
          })}
        </div>
      );
    } else {
      return (
        <div>
          <h1>No Users Found</h1>
        </div>
      );
    }
  }
}

// Fetch Global/Redux States
const mapStateToProps = createStructuredSelector({
  usersList: selectAllUsersList,
});

// Call Global/Redux Actions
const mapDispatchToProps = (dispatch) => ({
  fetchAllUsers: () => dispatch(fetchAllUsers()),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserList);
