import React, { Component } from "react";
import SignIn from "../../components/signIn/SignIn";
import { selectCurrentUser } from "../../redux/user/user.selector";
import { createStructuredSelector } from "reselect";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

const AuthPage = ({ currentUser }) => {
  if (currentUser.isAuthenticated) {
    return <Redirect to="/" />;
  }
  return (
    <div>
      <SignIn />
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

export default connect(mapStateToProps)(AuthPage);
