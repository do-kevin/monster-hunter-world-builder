import React from "react";
import {
  Card, withStyles, CardHeader, CardContent,
  Table, TableHead, TableRow, TableBody, TableCell,
  Paper,
} from "@material-ui/core";
import {
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
} from "recharts";
import _ from "lodash";
import SlidingModal from "components/SlidingModal";

const styles = () => ({});

function ArmorModal(props) {
  const {
    classes, isOpen, onClose, armorData,
  } = props;

  const {
    name, defense, type, resistances,
  } = armorData;
  console.log(armorData);

  const dragonRes = _.get(resistances, "dragon"),
    waterRes = _.get(resistances, "water"),
    fireRes = _.get(resistances, "fire"),
    iceRes = _.get(resistances, "ice"),
    thunderRes = _.get(resistances, "thunder");

  const data = [
    {
      resistance: `dragon ( ${dragonRes} )`, number: dragonRes,
    },
    {
      resistance: `water ( ${waterRes} )`, number: waterRes,
    },
    {
      resistance: `fire ( ${fireRes} )`, number: fireRes,
    },
    {
      resistance: `ice ( ${iceRes} )`, number: iceRes,
    },
    {
      resistance: `thunder ( ${thunderRes} )`, number: thunderRes,
    },
  ];

  return (
    <SlidingModal
      isOpen={isOpen}
      onClose={onClose}
    >
      <Card
        className={classes.card}
        style={{ outline: "none", width: "900px" }}
      >
        <CardHeader
          title={name}
          subheader={type}
        />
        <CardContent>
          <Paper className={classes.paper}>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell align="center">{" "}</TableCell>
                  <TableCell align="center">Base</TableCell>
                  <TableCell align="center">Max</TableCell>
                  <TableCell align="center">Augmented</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell align="center">Defense</TableCell>
                  <TableCell align="center">{_.get(defense, "base")}</TableCell>
                  <TableCell align="center">{_.get(defense, "max")}</TableCell>
                  <TableCell align="center">{_.get(defense, "augmented")}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Paper>
        </CardContent>
        <Paper
          className={classes.paper}
          style={{ margin: "auto", width: "370px", padding: "10px 0 0 10px" }}
        >
          <RadarChart
            width={370}
            height={250}
            data={data}
          >
            <PolarGrid />
            <PolarAngleAxis dataKey="resistance" />
            <PolarRadiusAxis />
            <Radar name={name} dataKey="number" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
          </RadarChart>
        </Paper>
      </Card>
    </SlidingModal>
  );
}

export default withStyles(styles)(ArmorModal);
