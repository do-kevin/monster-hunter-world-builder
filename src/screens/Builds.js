import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
  AppBar, Toolbar, withStyles, TextField, Button,
} from "@material-ui/core";
import { Formik } from "formik";

import { createLoadout } from "store/ducks/MonsterHunter";
import { View, ChildGrid } from "screens/Styles";

const styles = () => ({
  appbar: {
    gridArea: "Topbar",
    height: "70px",
    background: "hsl(205, 11%, 31%)",
    width: "100%",
    position: "absolute",
    alignItems: "center",
  },
  toolbar: {
    paddingLeft: "120px",
    display: "flex",
    flexDirection: "row",
  },
  field: {
    height: "40px",
    backgroundColor: "hsl(206, 11%, 42%)",
    borderRadius: "4px",
  },
});

function Builds(props) {
  const { classes, createLoadout, loadouts } = props;
  const { builds } = loadouts;

  return (
    <ChildGrid>
      <AppBar
        className={classes.appbar}
      >
        <Toolbar
          className={classes.toolbar}
        >
          <Formik
            initialValues={{ name: "" }}
            onSubmit={values => createLoadout(values.name)}
            render={({ values, handleChange, handleSubmit }) => (
              <form onSubmit={handleSubmit}>
                <TextField
                  className={`${classes.textField} name-filter`}
                  type="text"
                  name="name"
                  placeholer="Name"
                  value={values.name}
                  onChange={handleChange}
                  margin="normal"
                  variant="outlined"
                  InputProps={{
                    className: classes.field,
                  }}
                />
                <Button
                  type="submit"
                  variant="contained"
                  style={{
                    margin: "18px 0 0 8px",
                    textTransform: "none",
                  }}
                >
                  Create loadout
                </Button>
              </form>
            )}
          />
        </Toolbar>
      </AppBar>
      <View>
        {
          Object.keys(builds).map(key => (
            <p key={key}>{key}</p>
          ))
        }
      </View>
    </ChildGrid>
  );
}

const componentWithStyles = withStyles(styles)(Builds);

const mapStateToProps = state => ({ loadouts: state.loadouts });

const mapDispatchToProps = dispatch => ({
  createLoadout: bindActionCreators(createLoadout, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(componentWithStyles);
