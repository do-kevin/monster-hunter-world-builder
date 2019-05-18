import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
  Card, withStyles, CardHeader, CardContent,
  Table, TableHead, TableRow, TableBody, TableCell,
  Tooltip, CardMedia, CardActions, Button, Typography,
  FormControl, Select, MenuItem, InputLabel, OutlinedInput,
  IconButton,
} from "@material-ui/core";
import { Close } from "@material-ui/icons";
import { Formik } from "formik";
import {
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
} from "recharts";
import _ from "lodash";
import { armorToLoadout } from "store/ducks/Loadouts";
import { SlidingModal, Panel } from "components/layout";
import { StyledRecharts } from "screens/Styles";

const styles = () => ({
  imagePanel: {
    width: "100px",
    height: "100px",
    margin: "auto",
  },
  betterTooltip: {
    fontSize: "16px",
    backgroundColor: "black",
  },
  select: {
    top: "626px",
    background: "red",
  },
  newTitle: {
    color: "hsl(205,11%,80%)",
    fontWeight: 600,
  },
});

const panelBtn = {
  cursor: "pointer",
  padding: "8px",
};

class ArmorModal extends Component {
  state = {
    swapImage: false,
  }

  render() {
    const { swapImage } = this.state;

    const {
      classes, isOpen, onClose, armorData, loadouts, armorToLoadout,
    } = this.props;

    const { builds } = loadouts;

    const {
      name, defense, type, resistances, crafting, skills, assets,
    } = armorData;

    const maleArmor = _.get(assets, "imageMale"),
      femaleArmor = _.get(assets, "imageFemale");

    const materials = _.get(crafting, "materials");

    const dragonRes = _.get(resistances, "dragon"),
      waterRes = _.get(resistances, "water"),
      fireRes = _.get(resistances, "fire"),
      iceRes = _.get(resistances, "ice"),
      thunderRes = _.get(resistances, "thunder");

    const baseDef = _.get(defense, "base"),
      maxDef = _.get(defense, "max"),
      augmentedDef = _.get(defense, "augmented");

    const data = [
      {
        resistance: `Dragon ( ${dragonRes} )`, number: dragonRes,
      },
      {
        resistance: `Water ( ${waterRes} )`, number: waterRes,
      },
      {
        resistance: `Fire ( ${fireRes} )`, number: fireRes,
      },
      {
        resistance: `Ice ( ${iceRes} )`, number: iceRes,
      },
      {
        resistance: `Thunder ( ${thunderRes} )`, number: thunderRes,
      },
    ];
    return (
      <SlidingModal
        isOpen={isOpen}
        onClose={onClose}
      >
        <Card
          className={classes.card}
          style={{
            outline: "none",
            background: "hsl(0, 0%, 41%)",
            minWidth: "755px",
          }}
        >
          <CardHeader
            title={name}
            subheader={type}
            style={{
              background: "hsl(207, 11%, 31%)",
            }}
            classes={{
              title: classes.newTitle,
              subheader: classes.newTitle,
            }}
          />
          <CardContent
            style={{
              display: "flex",
              flexWrap: "wrap",
            }}
          >
            <Panel
              title={
                swapImage
                  ? <i className="fas fa-female" />
                  : <i className="fas fa-male" />
              }
              onClick={() => this.setState({ swapImage: !swapImage })}
              CardHeaderProps={panelBtn}
            >
              <CardMedia
                className={`
                  ${classes.media}
                  ${classes.imagePanel}
                `}
                image={
                  swapImage
                    ? femaleArmor
                    : maleArmor
                }
              />
            </Panel>
            <Panel
              title="Crafting Requirements"
            >
              <Table className={classes.table}>
                <TableHead>
                  <TableRow>
                    <TableCell align="left">Item</TableCell>
                    <TableCell align="center">Quantity</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {
                  _.map(materials, ({ item, quantity }) => (
                    <TableRow key={item.id}>
                      <TableCell align="left">
                        <Tooltip
                          classes={{ tooltip: classes.betterTooltip }}
                          title={item.description}
                          placement="top"
                        >
                          <span>{item.name}</span>
                        </Tooltip>
                      </TableCell>
                      <TableCell align="center">{quantity}</TableCell>
                    </TableRow>
                  ))
                }
                </TableBody>
              </Table>
            </Panel>
            <Panel
              title="Defense Rating"
            >
              <Table className={classes.table}>
                <TableHead>
                  <TableRow>
                    <TableCell align="center">Base</TableCell>
                    <TableCell align="center">Max</TableCell>
                    <TableCell align="center">Augmented</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell align="center">{baseDef}</TableCell>
                    <TableCell align="center">{maxDef}</TableCell>
                    <TableCell align="center">{augmentedDef}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Panel>
            <Panel
              title="Passives"
            >
              <Table className={classes.table}>
                <TableHead>
                  <TableRow>
                    <TableCell align="left">Skill</TableCell>
                    <TableCell align="center">Level</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {
                    _.map(skills, skill => (
                      <TableRow key={skill.skill}>
                        <TableCell align="left">
                          <Tooltip
                            classes={{ tooltip: classes.betterTooltip }}
                            title={skill.description}
                            placement="top"
                          >
                            <span>{skill.skillName}</span>
                          </Tooltip>
                        </TableCell>
                        <TableCell align="center">{skill.level}</TableCell>
                      </TableRow>
                    ))
                  }
                </TableBody>
              </Table>
            </Panel>
            <Panel
              title="Elemental Resistances"
            >
              <StyledRecharts>
                <RadarChart
                  width={370}
                  height={250}
                  data={data}
                >
                  <PolarGrid />
                  <PolarAngleAxis dataKey="resistance" />
                  <PolarRadiusAxis />
                  <Radar
                    name={name}
                    dataKey="number"
                    stroke="hsl(235, 100%, 50%)"
                    fill="hsl(219, 61%, 53%)"
                    fillOpacity={0.6}
                  />
                </RadarChart>
              </StyledRecharts>
            </Panel>
          </CardContent>
          <CardActions
            style={{ backgroundColor: "hsl(207, 11%, 31%)" }}
          >
            <Formik
              initialValues={{ selectedLoadout: "" }}
              onSubmit={values => armorToLoadout(values.selectedLoadout, armorData)}
              render={({ values, handleSubmit, handleChange }) => (
                <div
                  style={{
                    padding: "5px 10px",
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                  }}
                >
                  {
                    Object.keys(builds).length === 0
                      ? (
                        <Typography
                          variant="body1"
                          style={{
                            color: "hsl(0, 0%, 0%)",
                            padding: "12px 20px",
                            borderRadius: "5px",
                            backgroundColor: "hsl(48, 100%, 50%)",
                          }}
                        >
                          Please create a loadout to save the item
                        </Typography>
                      )
                      : (
                        <form onSubmit={handleSubmit}>
                          <FormControl
                            className={classes.formControl}
                            variant="outlined"
                          >
                            <InputLabel htmlFor="selectedLoadout">Select</InputLabel>
                            <Select
                              onChange={handleChange}
                              value={values.selectedLoadout}
                              style={{
                                width: "200px",
                                background: "hsl(205, 11%, 42%)",
                                borderRadius: "5px",
                              }}
                              input={(
                                <OutlinedInput
                                  labelWidth={200}
                                  name="selectedLoadout"
                                  id="selectedLoadout"
                                />
                              )}
                            >
                              {
                                Object.keys(builds).map(loadout => (
                                  <MenuItem key={loadout} value={loadout}>{loadout}</MenuItem>
                                ))
                              }
                            </Select>
                          </FormControl>
                          <Button
                            variant="contained"
                            color="secondary"
                            type="submit"
                            style={{
                              margin: "10.5px 0 0 10px",
                              textTransform: "none",
                              color: "hsl(0, 0%, 100%)",
                              fontWeight: 600,
                            }}
                          >
                            Save armor to loadout
                          </Button>
                        </form>
                      )
                  }
                  <IconButton
                    style={{
                      background: "hsl(207, 11%, 25%)",
                      color: "hsl(205,11%,80%)",
                      height: "50px",
                    }}
                    onClick={onClose}
                  >
                    <Close />
                  </IconButton>
                </div>
              )}
            />
          </CardActions>
        </Card>
      </SlidingModal>
    );
  }
}

const componentWithStyles = withStyles(styles)(ArmorModal);

const mapStateToProps = state => ({ loadouts: state.loadouts });

const mapDispatchToProps = dispatch => ({
  armorToLoadout: bindActionCreators(armorToLoadout, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(componentWithStyles);
