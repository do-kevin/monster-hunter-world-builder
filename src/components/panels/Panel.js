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
    borderTopLeftRadius: "10px",
    borderTopRightRadius: "10px",
  },
  titleColor: {
    color: grey5,
  },
  whiteText: {
    color: "hsl(0, 0%, 100%)",
  },
  get newPaperContainer() {
    return Object.assign({}, this.paperContainer, {
      margin: "15px",
    });
  },
});

function Panel(props) {
  const {
    classes, children, title,
    onClick, CardHeaderProps,
    classesProp, whiteHeaderText,
    spaceBetweenPanels,
  } = props;
  return (
    <Paper
      className={`
        ${classes.paper}
        ${
          !spaceBetweenPanels
            ? classes.paperContainer
            : classes.newPaperContainer
        }
      `}
      classes={classesProp}
    >
      <CardHeader
        className={classes.panel}
        title={title}
        classes={
          !whiteHeaderText
            ? { title: classes.titleColor }
            : { title: classes.whiteText }
        }
        onClick={onClick}
        style={CardHeaderProps}
      />
      {children}
    </Paper>
  );
}

export default withStyles(styles)(Panel);
