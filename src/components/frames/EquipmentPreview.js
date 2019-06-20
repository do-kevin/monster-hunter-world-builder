import React, { Component } from "react";
import { connect } from "react-redux";
import {
  CardMedia, withStyles, Tooltip, IconButton,
} from "@material-ui/core";
import _ from "lodash";
import { Cached } from "components/icons/MuiIconsDx";
import { primary1, grey0, grey5 } from "Colors";

const styles = () => ({
  tooltip: {
    backgroundColor: "black",
    color: "white",
    fontSize: "18px",
  },
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  slot: {
    height: "65px",
    width: "65px",
    backgroundColor: primary1,
    margin: "5px",
  },
});

class EquipmentPreview extends Component {
  state = {
    swapImage: false,
  };

  render() {
    const {
      loadoutData = {}, armors, classes, weapons,
    } = this.props;

    const { swapImage } = this.state;

    const equipment = Object.values(loadoutData).map((id, i) => {
      const newKey = `divSlot${i}`;
      if (id && Object.keys(id)[0] === "primary") {
        return (
          <Tooltip
            key={id}
            classes={{ tooltip: classes.tooltip }}
            title={
              _.get(weapons[id.primary], "name") || " "
            }
          >
            <CardMedia
              className={`${classes.media} ${classes.slot}`}
              image={
                _.get(weapons[id.primary], "assets.image") || " "
              }
            />
          </Tooltip>
        );
      }

      if (id) {
        return (
          <Tooltip
            key={id}
            classes={{ tooltip: classes.tooltip }}
            title={
              _.get(armors[id], "name") || " "
            }
          >
            <CardMedia
              className={`${classes.media} ${classes.slot}`}
              image={
                _.get(armors[id], `assets.${swapImage ? "imageFemale" : "imageMale"}`) || " "
              }
            />
          </Tooltip>
        );
      }
      return <div key={newKey} className={classes.slot} />;
    });

    return (
      <section>
        <header style={{ textAlign: "center", color: grey0 }}>
          Equipment
          {" "}
          <IconButton
            style={{
              padding: "0",
              color: grey5,
              background: primary1,
            }}
            onClick={() => this.setState({ swapImage: !swapImage })}
            type="button"
          >
            <Cached />
          </IconButton>
        </header>
        <div className={classes.container}>
          {
            equipment.length === 1
              ? (
                <div className={classes.container}>
                  <div className={classes.slot} />
                  <div className={classes.slot} />
                  <div className={classes.slot} />
                  <div className={classes.slot} />
                  <div className={classes.slot} />
                  <div className={classes.slot} />
                </div>
              )
              : equipment
          }
        </div>
      </section>
    );
  }
}

const componentWithStyles = withStyles(styles)(EquipmentPreview);

const mapStateToProps = state => ({
  armors: state.warehouse.armors,
  weapons: state.warehouse.weapons,
});

export default connect(mapStateToProps)(componentWithStyles);
