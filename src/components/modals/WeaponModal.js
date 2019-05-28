import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { SlidingModal } from "components/modals";
import { Panel, TableTwoCellsPanel } from "components/panels";
import {
  withStyles, Card, CardHeader, CardActions,
  IconButton, CardContent, CardMedia,
  TableRow, TableCell, Tooltip, FormControl, InputLabel,
  Select, OutlinedInput, Button, MenuItem, Typography,
} from "@material-ui/core";
import { Close } from "components/icons/MuiIconsDx";
import inflection from "inflection";
import _ from "lodash";
import { modalStyles } from "Styles";
import CustomBarChart from "components/charts/CustomBarChart";
import { weaponToLoadout } from "store/ducks/Loadouts";
import { Formik } from "formik";
import { grey4 } from "Colors";

function WeaponModal(props) {
  const {
    classes, isWeaponModalOpen, onClose, weaponData, loadouts,
    weaponToLoadout,
  } = props;

  const { builds } = loadouts;

  const {
    name = "", type = "", assets = {}, crafting = {}, rarity = "",
    attributes = {}, attack = {}, elements = [],
  } = weaponData;
  const { image = "" } = assets;
  const { craftingMaterials = [], upgradeMaterials = [] } = crafting;
  const { damageType = "" } = attributes;
  const { display = 0 } = attack;

  const attackPower = display;
  const newType = inflection.titleize(type.replace(/-/g, " "));

  const data = [
    { Name: "Attack Power", Damage: attackPower },
  ];

  _.map(elements, (elem) => {
    data.push({
      Name: inflection.capitalize(elem.type), Damage: elem.damage,
    });
  });

  return (
    <SlidingModal
      isModalOpen={isWeaponModalOpen}
      onClose={onClose}
    >
      <Card
        className={`${classes.card} ${classes.customCard}`}
      >
        <CardHeader
          title={name}
          subheader={newType}
          style={{
            background: grey4,
          }}
          classes={{
            title: classes.newTitle,
            subheader: classes.newTitle,
          }}
        />
        <CardContent className={`${classes.centerContent}`}>
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
          <Panel title="Attack">
            <CustomBarChart
              width={400}
              data={data}
              XAxisLabel="Name"
              YAxisLabel="Damage"
              dataKey="Damage"
              style={{ padding: "28px 25px 18px 0px" }}
            />
          </Panel>
          <TableTwoCellsPanel
            title="Crafting requirements"
            firstCellName="Item"
            secondCellName="Quantity"
          >
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
          </TableTwoCellsPanel>
          <TableTwoCellsPanel
            title="Upgrade requirements"
            firstCellName="Item"
            secondCellName="Quantity"
          >
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
          </TableTwoCellsPanel>
        </CardContent>
        <CardActions
          style={{ backgroundColor: grey4 }}
        >
          <Formik
            initialValues={{ selectedLoadout: "" }}
            onSubmit={values => weaponToLoadout(values.selectedLoadout, weaponData)}
            render={({ values, handleSubmit, handleChange }) => (
              <div className={classes.footer}>
                {
                    Object.keys(builds).length === 0
                      ? (
                        <Typography
                          variant="body1"
                          className={classes.loadoutWarning}
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
                              className={classes.selectField}
                              onChange={handleChange}
                              value={values.selectedLoadout}
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
                            className={classes.submitBtn}
                          >
                            Save weapon to loadout
                          </Button>
                        </form>
                      )
                  }
                <IconButton
                  className={classes.closeModalBtn}
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

const componentWithStyles = withStyles(modalStyles)(WeaponModal);

const mapStateToProps = state => ({ loadouts: state.loadouts });

const mapDispatchToProps = dispatch => ({
  weaponToLoadout: bindActionCreators(weaponToLoadout, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(componentWithStyles);
