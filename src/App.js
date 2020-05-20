import React from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import Homepage from "./pages/homepage/Homepage";
import PrivateRoute from "./components/utility/PrivateRoute";
import AuthPage from "./pages/auth/AuthPage";
import AlertsMsg from "./components/alerts/Alerts";

function App() {
  return (
    <>
      <AlertsMsg />
      <Switch>
        <Route exact path="/signin" component={AuthPage} />
        <PrivateRoute exact path="/" component={Homepage} />
      </Switch>
    </>
  );
}

export default App;
