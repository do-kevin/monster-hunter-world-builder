/* eslint-disable react/require-default-props */
import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import { Button, withStyles } from "@material-ui/core";

const styles = () => ({
  NotFoundBtn: {
    width: "200px",
    display: "inline-block",
    textDecoration: "none",
    marginTop: "10px",
    fontWeight: "600",
  },
});

function NotFound(props) {
  NotFound.propTypes = {
    classes: PropTypes.objectOf(PropTypes.object),
  };

  const { classes } = props;

  return (
    <div className="NotFound">
      <section className="NotFound__section">
        <p className="NotFound__section__p1">404</p>
        <p className="NotFound__section__p2">PAGE NOT FOUND</p>
        <p className="NotFound__section__p3">There&apos;s nothing here.</p>
        <Link to="/">
          <Button
            className={classes.NotFoundBtn}
            color="primary"
            variant="contained"
            size="large"
          >
            Go back
          </Button>
        </Link>
      </section>
    </div>
  );
}

export default withStyles(styles)(NotFound);
