import React, { Component } from "react";
import {
  Card, withStyles, CardHeader, CardContent,
  Table, TableHead, TableRow, TableBody, TableCell,
  Tooltip, CardMedia,
} from "@material-ui/core";
import {
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
} from "recharts";
import _ from "lodash";
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
});

const panelBtn = {
  cursor: "pointer",
  background: "linear-gradient(to bottom, hsl(204, 12%, 57%), hsl(204, 12%, 47%), hsl(204, 12%, 37%))",
  padding: "8px",
};

class ArmorModal extends Component {
  state = {
    swapImage: false,
  }

  render() {
    const { swapImage } = this.state;

    const {
      classes, isOpen, onClose, armorData,
    } = this.props;

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
              background: "white",
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
            <Panel title="Crafting Requirements">
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
            <Panel title="Defense Rating">
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
            <Panel title="Passives">
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
            <Panel title="Elemental Resistances">
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
        </Card>
      </SlidingModal>
    );
  }
}

export default withStyles(styles)(ArmorModal);
