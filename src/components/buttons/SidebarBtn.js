import React from "react";
import { withStyles, Button, Grid } from "@material-ui/core";
import PropTypes from "prop-types";

const styles = () => ({
  sidebarBtn: {
    margin: "3px 0",
    color: "hsl(0, 0%, 98%)",
    width: "110px",
    padding: "25px 5px",
  },
  gridDivider: {
    borderBottom: "1px ridge hsl(247, 9%, 21%)",
  },
});

function SidebarBtn(props) {
  const {
    classes, label, icon, divider, color, onClick, disabled,
  } = props;
  console.log(label);

  SidebarBtn.defaultProps = {
    label: "",
  };

  SidebarBtn.propTypes = {
    icon: PropTypes.element.isRequired,
    label: PropTypes.string,
  };

  return (
    <Grid
      item
      className={divider ? classes.gridDivider : ""}
    >
      <Button
        className={classes.sidebarBtn}
        color={color}
        onClick={onClick}
        disabled={disabled}
      >
        {icon}{" "}{label}
      </Button>
    </Grid>
  );
}

export default withStyles(styles)(SidebarBtn);
