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
import { Close } from "components/icons/MuiIconsDx";
import { MaleIcon, FemaleIcon } from "components/icons/FontAwesomeIcons";
import inflection from "inflection";
import _ from "lodash";
import { Formik } from "formik";
import { modalStyles } from "Styles";
import CustomBarChart from "components/charts/CustomBarChart";
import { armorToLoadout } from "store/ducks/Loadouts";
import { SlidingModal } from "components/modals";
import { Panel, TableTwoCellsPanel } from "components/panels";
import { grey4 } from "Colors";

const panelBtn = {
  cursor: "pointer",
  padding: "8px",
};

class ArmorModal extends Component {
  state = {
    swapImage: false,
    mediaQuery: false,
  }

  componentDidMount() {
    window.addEventListener("resize", this.handleMediaQuery);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleMediaQuery);
  }

  handleMediaQuery = () => {
    if (window.innerWidth <= 609) {
      this.setState({ mediaQuery: true });
    } else {
      this.setState({ mediaQuery: false });
    }
  }

  render() {
    const { swapImage, mediaQuery } = this.state;

    const {
      classes, isArmorModalOpen, onClose, armorData, loadouts,
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
        <Card
          className={`
            ${classes.card}
            ${classes.customCard}
            ${
              mediaQuery
                ? classes.mediaQueryCard
                : ""
            }
          `}
        >
          <CardHeader
            title={name}
            subheader={newType}
            style={{ background: grey4 }}
            classes={{
              title: classes.newTitle,
              subheader: classes.newTitle,
            }}
          />
          <CardContent
            className={classes.centerContent}
            classes={{ root: "responsive-card__content" }}
          >
            <Panel
              title={
                swapImage
                  ? <FemaleIcon />
                  : <MaleIcon />
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
            className="responsive-card__actions"
            style={{ backgroundColor: grey4 }}
          >
            <Formik
              initialValues={{ selectedLoadout: "" }}
              onSubmit={async (values) => {
                await this.props.armorToLoadout(values.selectedLoadout, armorData, type);
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
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(componentWithStyles);
