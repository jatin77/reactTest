import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import { selectCurrentUser } from "../../redux/user/user.selector";
import { createStructuredSelector } from "reselect";

const PrivateRoute = ({ component: Component, user, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      if (!user.isAuthenticated) {
        return <Redirect to="/signin" />;
      } else {
        return <Component {...props} />;
      }
    }}
  />
);

// Fetch Global/Redux States
const mapStateToProps = createStructuredSelector({
  user: selectCurrentUser,
});

export default connect(mapStateToProps)(PrivateRoute);
