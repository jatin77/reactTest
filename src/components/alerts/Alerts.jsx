import React, { Component } from "react";
import { connect } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import WarningIcon from "@material-ui/icons/Warning";
import InfoIcon from "@material-ui/icons/Info";

export class AlertsMsg extends Component {
  componentDidUpdate(prevProps) {
    const { alert } = this.props;
    if (alert !== prevProps.alert) {
      switch (alert.alertType) {
        case "info":
          toast.info(
            <>
              <InfoIcon /> {alert.msg}
            </>
          );
          break;
        case "success":
          toast.success(
            <>
              <CheckCircleOutlineIcon /> {alert.msg}
            </>
          );
          break;
        case "error":
          toast.error(
            <>
              <ErrorOutlineIcon /> {alert.msg}
            </>
          );
          break;
        case "warning":
          toast.warning(
            <>
              <WarningIcon /> {alert.msg}
            </>
          );
          break;
        default:
          return;
      }
    }
  }
  render() {
    return (
      <>
        <ToastContainer hideProgressBar={true} slide />
      </>
    );
  }
}

// Fetch Global/Redux States
const mapStateToProps = (state) => ({
  alert: state.alert,
});

export default connect(mapStateToProps)(AlertsMsg);
