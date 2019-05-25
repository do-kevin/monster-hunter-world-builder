import React from "react";
import { withStyles, Paper, CardHeader } from "@material-ui/core";
import { grey2, grey5 } from "Colors";

const styles = () => ({
  panel: {
    textAlign: "center",
    background: grey2,
    borderTopLeftRadius: "4px",
    borderTopRightRadius: "4px",
  },
  paperContainer: {
    height: "min-content",
    margin: "5px",
    paddingBottom: "2px",
  },
  titleColor: {
    color: grey5,
  },
});

function Panel(props) {
  const {
    classes, children, title,
    onClick, CardHeaderProps,
  } = props;
  return (
    <Paper
      className={`
        ${classes.paper}
        ${classes.paperContainer}
      `}
    >
      <CardHeader
        className={classes.panel}
        title={title}
        classes={{
          title: classes.titleColor,
        }}
        onClick={onClick}
        style={CardHeaderProps}
      />
      {children}
    </Paper>
  );
}

export default withStyles(styles)(Panel);
