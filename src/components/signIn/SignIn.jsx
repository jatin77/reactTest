import React, { Component } from "react";
import { connect } from "react-redux";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { setCurrentUser } from "../../redux/user/user.action";
import { showAlert } from "../../redux/alerts/alert.action";

export class SignIn extends Component {
  state = {
    userName: "",
    userNameError: false,
    userPassword: "",
    userPasswordError: false,
  };

  // Form Submit Handle for User Signin
  handleSubmit = (e) => {
    e.preventDefault();
    let invalidName = this.validateInput(["userName"]);

    let invalidPassword = this.validateInput(["userPassword"]);

    if (!invalidPassword && !invalidName) {
      this.props.setCurrentUser({
        userName: this.state.userName,
      });
      // Handle Alert
      this.props.showAlert({
        msg: "Login Successful",
        alertType: "success",
      });
    }
  };

  // Validate Input Text Fields
  validateInput = (field) => {
    let error = false;

    let stateName = field + "Error";
    if (
      (field[0] === "userName" && this.state[field] === "john doe") ||
      (field[0] === "userPassword" && this.state[field] === "trythis")
    ) {
      error = false;
      this.setState({
        [stateName]: false,
      });
    } else {
      error = true;
      this.setState({
        [stateName]: true,
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
      <div className="flex justify-center items-center flex-col h-screen">
        <div
          className="bg-indigo-100 border-t-4 border-indigo-700 rounded-b text-indigo-900 px-6 py-3 shadow-md mb-12 "
          role="alert"
        >
          <div className="flex">
            <div className="py-1">
              <svg
                className="fill-current h-6 w-6 text-indigo-700 mr-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
              </svg>
            </div>
            <div>
              <p className="text-sm">
                <b>User Name:</b> john doe
              </p>
              <p className="text-sm">
                <b>User Password:</b> trythis
              </p>
            </div>
          </div>
        </div>
        <form
          noValidate
          autoComplete="off"
          onSubmit={this.handleSubmit}
          ref={(el) => (this.myFormRef = el)}
        >
          <div>
            <TextField
              size="small"
              error={this.state.userNameError}
              name="userName"
              label="User Name"
              helperText={this.state.userNameError ? "Invalid User Name" : ""}
              variant="outlined"
              fullWidth={true}
              onChange={this.handleChange}
              value={this.state.userName}
            />
            <br />
            <br />
            <TextField
              size="small"
              value={this.state.userPassword}
              onChange={this.handleChange}
              fullWidth={true}
              error={this.state.userPasswordError}
              label="Password"
              multiline
              name="userPassword"
              variant="outlined"
              helperText={
                this.state.userPasswordError ? "Invalid User Password" : ""
              }
            />
            <div className="text-center mt-8">
              <Button
                className="w-full"
                type="submit"
                variant="contained"
                size="medium"
                color="primary"
              >
                Login
              </Button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

// Call Global/Redux Actions
const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
  showAlert: (alert) => dispatch(showAlert(alert)),
});

export default connect(null, mapDispatchToProps)(SignIn);
