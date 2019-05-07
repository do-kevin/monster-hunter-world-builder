import React from "react";
import { withStyles, Paper, CardHeader } from "@material-ui/core";

const styles = () => ({
  panel: {
    textAlign: "center",
    background: "hsl(204, 12%, 47%)",
    borderTopLeftRadius: "4px",
    borderTopRightRadius: "4px",
  },
  paperContainer: {
    height: "min-content",
    margin: "5px",
    paddingBottom: "2px",
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
        onClick={onClick}
        style={CardHeaderProps}
      />
      {children}
    </Paper>
  );
}

export default withStyles(styles)(Panel);
