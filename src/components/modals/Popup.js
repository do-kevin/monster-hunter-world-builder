import React, { Component } from "react";
import { Button } from "@material-ui/core";
import { grey0, toastInfo } from "Colors";

const popupStyles = {
  width: "300px",
  height: "max-content",
  padding: "10px 25px 15px",
  background: toastInfo,
  position: "absolute",
  bottom: 0,
  right: 0,
  marginRight: 40,
  marginBottom: 20,
  color: grey0,
};

class Popup extends Component {
  state = {
    popup: true,
  };

  componentDidMount() {
    this.alreadyRead();
  }

  alreadyRead = () => {
    const localPopup = JSON.parse(localStorage.getItem("popup"));
    if (localPopup === false) {
      return this.setState({ popup: false });
    }

    if (localPopup === null) {
      return localStorage.setItem("popup", true);
    }
  }

  onClosePopup = () => {
    this.setState({ popup: false });
    return localStorage.setItem("popup", false);
  }

  render() {
    const { popup } = this.state;
    return (
      <div>
        {
          popup
            ? <div style={popupStyles}>
              <p style={{ textAlign: "center" }}>
                This website is using LogRocket to watch any errors that appear during your visit
              </p>
              <Button
                style={{ textTransform: "none" }}
                variant="contained"
                onClick={() => this.onClosePopup()}
              >
                I understand
              </Button>
            </div>
            : null
        }
      </div>
    );
  }
}

export default Popup;
