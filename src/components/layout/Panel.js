import React from "react";
import { withStyles, Paper, CardHeader } from "@material-ui/core";

const styles = () => ({
  panel: {
    textAlign: "center",
    background: "hsl(204, 12%, 17%)",
    borderTopLeftRadius: "4px",
    borderTopRightRadius: "4px",
  },
  paperContainer: {
    height: "min-content",
    margin: "5px",
    paddingBottom: "2px",
  },
  titleColor: {
    color: "hsl(205,11%,80%)",
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
