import React, { Component } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import { addUser, updateUser } from "../../redux/allusers/allUser.action";
import { v4 as uuidv4 } from "uuid";
import { createStructuredSelector } from "reselect";
import { selectAllUsersList } from "../../redux/allusers/allUser.selector";
import { showAlert } from "../../redux/alerts/alert.action";

export class CreateEditUser extends Component {
  state = {
    userName: "",
    userNameError: false,
    githubLink: "",
    githubLinkError: false,
    imgURL: "",
    imgURLError: false,
    editMode: false,
    editUserID: null,
  };
  componentWillReceiveProps() {
    if (this.props.edit && this.props.id !== null) {
      let editUser = this.props.usersList.usersList.filter(
        (user) => user.id === this.props.id
      )[0];

      this.setState({
        editMode: true,
        userName: editUser.login,
        githubLink: editUser.html_url,
        imgURL: editUser.avatar_url,
        editUserID: this.props.id,
      });
    }
  }

  // Form Submit Handle for Update and Create Campaign
  handleSubmit = (e) => {
    e.preventDefault();

    let invalidName = this.validateInput("userName");
    let invalidGithubLink = this.validateInput("githubLink");
    let invalidImgURLError = this.validateInput("imgURL");

    if (!invalidGithubLink && !invalidName && !invalidImgURLError) {
      if (!this.state.editMode) {
        // Add User
        this.handleSuccessEditAddUser();
      } else {
        // Update User
        this.handleSuccessEditAddUser();
      }
    }
  };

  // Handle Success Edit Add User
  handleSuccessEditAddUser = () => {
    let user = {
      login: this.state.userName,
      html_url: this.state.githubLink,
      avatar_url: this.state.imgURL,
      id: this.state.editMode ? this.state.editUserID : uuidv4(),
    };
    let editMsg;
    if (this.state.editMode) {
      this.props.updateUser(user);
      editMsg = "User Updated Successfully";
    } else {
      this.props.addUser(user);
      editMsg = "User Added Successfully";
    }
    this.setState({
      userName: "",
      userNameError: false,
      githubLink: "",
      githubLinkError: false,
      imgURL: "",
      imgURLError: false,
      editMode: false,
      editUserID: null,
    });
    this.props.close();
    // Handle Alert
    this.props.showAlert({
      msg: editMsg,
      alertType: "success",
    });
  };

  // Validate Input Text Fields
  validateInput = (field) => {
    let error = false;

    let stateName = field + "Error";

    if (!this.state[field]) {
      error = true;
      this.setState({
        [stateName]: true,
      });
    } else {
      error = false;
      this.setState({
        [stateName]: false,
      });
    }

    return error;
  };

  // Store Input Text Values On Change to Local State
  handleChange = (e) => {
    let name = e.target.name;
    this.setState(
      {
        [e.target.name]: e.target.value,
      },
      () => this.validateInput([name])
    );
  };
  render() {
    return (
      <>
        <Dialog open={this.props.open} maxWidth="sm" fullWidth={true}>
          <div className="px-8">
            <div className="flex items-center">
              <div>
                <ArrowBackIcon
                  onClick={this.props.close}
                  className="cursor-pointer"
                />
              </div>
              <div className="w-full text-center">
                <DialogTitle>
                  {!this.state.editMode
                    ? "Creating a New User"
                    : "Updating a User"}
                </DialogTitle>
              </div>
            </div>

            <div className="py-8">
              <form
                noValidate
                autoComplete="off"
                onSubmit={this.handleSubmit}
                ref={(el) => (this.myFormRef = el)}
              >
                <div>
                  <TextField
                    size="small"
                    value={this.state.userName}
                    onChange={this.handleChange}
                    fullWidth={true}
                    error={this.state.userNameError}
                    label="User Name"
                    name="userName"
                    variant="outlined"
                    helperText={
                      this.state.userNameError ? "can't be blank" : ""
                    }
                  />
                  <br />
                  <br />
                  <TextField
                    size="small"
                    value={this.state.githubLink}
                    onChange={this.handleChange}
                    fullWidth={true}
                    error={this.state.githubLinkError}
                    label="Github Link"
                    name="githubLink"
                    variant="outlined"
                    helperText={
                      this.state.githubLinkError ? "can't be blank" : ""
                    }
                  />
                  <br />
                  <br />
                  <TextField
                    size="small"
                    value={this.state.imgURL}
                    onChange={this.handleChange}
                    fullWidth={true}
                    error={this.state.imgURLError}
                    label="User Image URL"
                    name="imgURL"
                    variant="outlined"
                    helperText={this.state.imgURLError ? "can't be blank" : ""}
                  />
                  <div className="text-center mt-8">
                    <Button
                      className="w-full"
                      type="submit"
                      variant="contained"
                      size="medium"
                      color="primary"
                    >
                      {this.state.editMode ? "Update" : "Create"}
                    </Button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </Dialog>
      </>
    );
  }
}

// Fetch Global/Redux States
const mapStateToProps = createStructuredSelector({
  usersList: selectAllUsersList,
});

// Call Global/Redux Actions
const mapDispatchToProps = (dispatch) => ({
  addUser: (user) => dispatch(addUser(user)),
  updateUser: (user) => dispatch(updateUser(user)),
  showAlert: (alert) => dispatch(showAlert(alert)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateEditUser);
