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
import inflection from "inflection";
import _ from "lodash";
import { Formik } from "formik";
import { modalStyles } from "Styles";
import CustomBarChart from "components/charts/CustomBarChart";
import { armorToLoadout, updateArmorMetaData } from "store/ducks/Loadouts";
import { SlidingModal } from "components/modals";
import { Panel, TableTwoCellsPanel } from "components/panels";
import { grey4 } from "Colors";
import styled from "styled-components";

const panelBtn = {
  cursor: "pointer",
  padding: "8px",
};

const StyledCardHeader = styled(CardHeader)`
  @media (max-width: 1430px) {
    padding-top: 81px;
    background-color: red;
  }
`;

class ArmorModal extends Component {
  state = {
    swapImage: false,
  }

  render() {
    const { swapImage } = this.state;

    const {
      classes, isArmorModalOpen, onClose, armorData, loadouts,
      armorToLoadout, updateArmorMetaData,
    } = this.props;

    const { builds } = loadouts;

    const {
      name = "", defense = "", type = "", resistances = {}, crafting = {}, skills = [], assets = {},
    } = armorData;
    const { imageMale = "", imageFemale = "" } = assets;
    const { materials = [] } = crafting;
    const {
      dragon = 0, water = 0, fire = 0, ice = 0, thunder = 0,
    } = resistances;
    const { base = 0, max = 0, augmented = 0 } = defense;

    const newType = inflection.capitalize(type);

    const data = [
      {
        Resistance: "Dragon", Rating: dragon,
      },
      {
        Resistance: "Water", Rating: water,
      },
      {
        Resistance: "Fire", Rating: fire,
      },
      {
        Resistance: "Ice", Rating: ice,
      },
      {
        Resistance: "Thunder", Rating: thunder,
      },
    ];
    return (
      <SlidingModal
        isModalOpen={isArmorModalOpen}
        onClose={onClose}
      >
        <Card className={`${classes.card} ${classes.customCard}`}>
          <StyledCardHeader
            title={name}
            subheader={newType}
            style={{ background: grey4 }}
            classes={{
              title: classes.newTitle,
              subheader: classes.newTitle,
            }}
          />
          <CardContent className={classes.centerContent}>
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
                    ? imageFemale
                    : imageMale
                }
              />
            </Panel>
            <Panel title="Elemental Resistances">
              <CustomBarChart
                data={data}
                XAxisLabel="Resistance"
                YAxisLabel="Rating"
                dataKey="Rating"
                style={{ padding: "29px 12px 8px 0" }}
              />
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
                    <TableCell align="center">{base}</TableCell>
                    <TableCell align="center">{max}</TableCell>
                    <TableCell align="center">{augmented}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Panel>
            <TableTwoCellsPanel
              title="Passives"
              firstCellName="Skills"
              secondCellName="Level"
            >
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
            </TableTwoCellsPanel>
            <TableTwoCellsPanel
              title="Crafting requirements"
              firstCellName="Item"
              secondCellName="Quantity"
            >
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
            </TableTwoCellsPanel>
          </CardContent>
          <CardActions
            style={{ backgroundColor: grey4 }}
          >
            <Formik
              initialValues={{ selectedLoadout: "" }}
              onSubmit={async (values) => {
                await armorToLoadout(values.selectedLoadout, armorData);
                updateArmorMetaData(values.selectedLoadout, type);
              }}
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
                              onChange={handleChange}
                              value={values.selectedLoadout}
                              className={classes.selectField}
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
                            Save armor to loadout
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
}

const componentWithStyles = withStyles(modalStyles)(ArmorModal);

const mapStateToProps = state => ({ loadouts: state.loadouts });

const mapDispatchToProps = dispatch => ({
  armorToLoadout: bindActionCreators(armorToLoadout, dispatch),
  updateArmorMetaData: bindActionCreators(updateArmorMetaData, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(componentWithStyles);
