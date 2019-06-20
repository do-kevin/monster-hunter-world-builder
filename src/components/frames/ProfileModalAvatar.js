import React, { Component } from "react";
import {
  CardMedia, Avatar, withStyles,
} from "@material-ui/core";
import {
  darkishGrey,
} from "Colors";

const styles = () => ({
  innerAvatar: {
    height: "130px",
    width: "130px",
    borderRadius: "50%",
    boxShadow: `0 2px 10px ${darkishGrey}`,
  },
});

class ProfileModalAvatar extends Component {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    const { classes, src } = this.props;
    return (
      <CardMedia
        className={classes.media}
        src={src}
      >
        <Avatar
          className={classes.innerAvatar}
          src={src}
          alt="avatar placeholder"
        />
      </CardMedia>
    );
  }
}

export default withStyles(styles)(ProfileModalAvatar);
