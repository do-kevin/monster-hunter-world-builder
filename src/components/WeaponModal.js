import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { SlidingModal, Panel } from "components/layout";
import {
  withStyles, Card, CardHeader, CardActions,
  IconButton, CardContent, CardMedia,
  Table, TableHead, TableRow, TableCell,
  Tooltip, TableBody, FormControl, InputLabel,
  Select, OutlinedInput, Button, MenuItem,
  Typography,
} from "@material-ui/core";
import { Close } from "@material-ui/icons";
import inflection from "inflection";
import _ from "lodash";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip as ChartTooltip, Legend,
} from "recharts";
import { weaponToLoadout } from "store/ducks/Loadouts";
import { Formik } from "formik";

const styles = () => ({
  newTitle: {
    color: "hsl(205,11%,80%)",
    fontWeight: 600,
  },
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

function WeaponModal(props) {
  const {
    classes, isOpen, onClose, weaponData, loadouts,
    weaponToLoadout,
  } = props;

  const { builds } = loadouts;

  const {
    name, type, assets, crafting, rarity,
    attributes, attack, elements,
  } = weaponData;
  let newType;

  const image = _.get(assets, "image");
  const craftingMaterials = _.get(crafting, "craftingMaterials");
  const upgradeMaterials = _.get(crafting, "upgradeMaterials");
  const damageType = _.get(attributes, "damageType");
  const attackPower = _.get(attack, "display");


  if (type === undefined) {
    newType = "";
  } else {
    newType = type.replace(/-/g, " ");
    newType = inflection.titleize(newType);
  }

  const data = [
    {
      Name: "Attack Power", Damage: attackPower,
    },
  ];

  _.map(elements, (elem) => {
    data.push({
      Name: inflection.capitalize(elem.type), Damage: elem.damage,
    });
  });

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
          subheader={newType}
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
            title={`Rarity ${rarity}`}
          >
            <CardMedia
              className={`
                ${classes.media}
                ${classes.imagePanel}
              `}
              image={image}
            />
          </Panel>
          <Panel
            title="Damage type"
          >
            <p style={{ textAlign: "center" }}>
              {
                damageType
                  ? inflection.capitalize(damageType)
                  : null
              }
            </p>
          </Panel>
          <Panel
            title="Attack"
          >
            <BarChart
              width={400}
              height={300}
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
              style={{
                padding: "28px 25px 18px 0px",
              }}
            >
              <XAxis dataKey="Name" />
              <YAxis dataKey="Damage" />
              <ChartTooltip />
              <Legend />
              <Bar
                dataKey="Damage"
                fill="hsl(0, 76%, 51%)"
                barSize={25}
              />
            </BarChart>
          </Panel>
          <Panel
            title="Crafting requirements"
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
                _.map(craftingMaterials, ({ item, quantity }) => (
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
            title="Upgrade requirements"
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
                  _.map(upgradeMaterials, ({ item, quantity }) => (
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
        </CardContent>
        <CardActions
          style={{ backgroundColor: "hsl(207, 11%, 31%)" }}
        >
          <Formik
            initialValues={{ selectedLoadout: "" }}
            onSubmit={values => weaponToLoadout(values.selectedLoadout, weaponData)}
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
                            Save weapon to loadout
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

const componentWithStyles = withStyles(styles)(WeaponModal);

const mapStateToProps = state => ({ loadouts: state.loadouts });

const mapDispatchToProps = dispatch => ({
  weaponToLoadout: bindActionCreators(weaponToLoadout, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(componentWithStyles);
