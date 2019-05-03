import React from "react";
import { withStyles, Button, Grid } from "@material-ui/core";
import { Link } from "react-router-dom";
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
    classes, label, icon, divider, color, onClick, disabled, to,
  } = props;

  return (
    <Grid
      item
      className={divider ? classes.gridDivider : ""}
    >
      <Link
        to={to}
        style={disabled ? { pointerEvents: "none" } : null}
      >
        <Button
          className={classes.sidebarBtn}
          color={color}
          onClick={onClick}
          disabled={disabled}
        >
          {icon}
          {" "}
          {label}
        </Button>
      </Link>
    </Grid>
  );
}

SidebarBtn.defaultProps = {
  label: "",
};

SidebarBtn.propTypes = {
  icon: PropTypes.element.isRequired,
  label: PropTypes.string,
};

export default withStyles(styles)(SidebarBtn);
