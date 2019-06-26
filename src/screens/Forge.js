import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
  AppBar, Toolbar, TextField, withStyles, IconButton, Typography, Button, LinearProgress,
} from "@material-ui/core";
import { Cached, Refresh } from "components/icons/MuiIconsDx";
import { ShieldAlt, Gavel } from "components/icons/FontAwesomeIcons";
import { Link as Scroll } from "react-scroll";
import ReactTable from "react-table";
import matchSorter from "match-sorter";
import inflection from "inflection";
import { Formik } from "formik";
import { retrieveAllArmors, retrieveAllWeapons, setLocalArmors, setLocalWeapons } from "store/ducks/Warehouse";
import {
  createLoadout, retrieveMyLoadouts, retrieveDbLoadouts,
} from "store/ducks/Loadouts";
import {
  ChildGrid, ExtendedView, ArmorsTable, TextButton,
} from "components/StyledComponents";
import { Panel } from "components/panels";
import CustomBarChart from "components/charts/CustomBarChart";
import {
  rTable, armorsStyles,
  armorCells, extendedTopbar, extendedToolbar,
} from "Styles";
import { ArmorModal, WeaponModal, DeleteLoadoutModal } from "components/modals";
import _ from "lodash";
import {
  grey0, grey5, lightGrey, darkishGrey, primary2, darkBlue1, greyCard, danger1,
} from "Colors";
import { postLoadoutsToDb, getMyLoadouts, putUpdatedLoadoutsToDb } from "services/MonsterHunterWorldApi";

const scrollToBtns = {
  color: grey5,
  textTransform: "none",
  fontWeight: 600,
};

class Forge extends Component {
  constructor(props) {
    super(props);
    this.reactTable = React.createRef();
    this.state = {
      searchingWeapon: false,
      openArmorModal: false,
      selectedArmorPiece: {},
      openWeaponModal: false,
      selectedWeapon: {},
      selectedLoadout: undefined,
      swapImage: false,
      openConfirmation: false,
    };
  }

  async componentDidMount() {
    this.props.setLocalArmors();
    this.props.setLocalWeapons();
    await this.props.retrieveAllArmors();
    await this.props.retrieveAllWeapons();
    await this.props.retrieveMyLoadouts();
  }

  generateColumn = (key = "", capitalize = false, filterable = false, show = true) => {
    const newCell = {
      id: inflection.camelize(key, key.charAt(0)),
      Header: inflection.humanize(key),
      accessor: key,
      filterable,
      show,
      Cell: data => (
        <Typography
          variant="body1"
          style={armorCells}
        >
          {
            capitalize
              ? inflection.capitalize(data.value)
              : data.value
          }
        </Typography>
      ),
    };
    return newCell;
  }

  generateArmorSlot = (id, type = "") => {
    const { classes, armors } = this.props;
    const { swapImage } = this.state;
    if (id) {
      return (
        <div className={classes.panel}>
          <div className={classes.inventoryPanel}>
            <img
              className={classes.inventoryImg}
              src={
                !swapImage
                  ? armors[id].assets.imageMale
                  : armors[id].assets.imageFemale
              }
              alt={armors[id].name}
            />
            <TextButton>
              <Typography
                style={{ padding: "16px 15px" }}
                variant="body1"
                onClick={() => this.setState({
                  openArmorModal: true,
                  selectedArmorPiece: armors[id],
                })}
                noWrap
              >
                {armors[id].name}
              </Typography>
            </TextButton>
          </div>
        </div>
      );
    }
    return (
      <div className={classes.panel}>
        <p> Empty {type} slot</p>
      </div>
    );
  };

  getSelectedLoadoutResist = (element = "") => {
    const { loadouts } = this.props;
    const { selectedLoadout } = this.state;
    const { builds } = loadouts;

    const getSelectedLoadout = _.get(builds, selectedLoadout);

    return _.get(getSelectedLoadout, `armor_meta.resistances.${element}`);
  }

  getSelectedLoadoutDefType = (type = "") => {
    const { loadouts } = this.props;
    const { selectedLoadout } = this.state;
    const { builds } = loadouts;

    const getSelectedLoadout = _.get(builds, selectedLoadout);

    return _.get(getSelectedLoadout, `armor_meta.defense.${type}`);
  }

  watchDefData = () => {
    const { loadouts } = this.props;
    const { selectedLoadout } = this.state;
    const { builds } = loadouts;

    const getSelectedLoadout = _.get(builds, selectedLoadout);

    const defaultData = [
      {
        Defense: "Base", Rating: 0,
      },
      {
        Defense: "Max", Rating: 0,
      },
      {
        Defense: "Augmented", Rating: 0,
      },
    ];

    if (getSelectedLoadout) {
      const base = this.getSelectedLoadoutDefType("base");
      const max = this.getSelectedLoadoutDefType("max");
      const augmented = this.getSelectedLoadoutDefType("augmented");

      const updatedData = [
        Object.assign({}, defaultData[0], { Rating: base }),
        Object.assign({}, defaultData[1], { Rating: max }),
        Object.assign({}, defaultData[2], { Rating: augmented }),
      ];
      return updatedData;
    }
    return defaultData;
  }

  watchResistData = () => {
    const { loadouts } = this.props;
    const { selectedLoadout } = this.state;
    const { builds } = loadouts;

    const getSelectedLoadout = _.get(builds, selectedLoadout);

    const defaultData = [
      {
        Resistance: "Dragon", Rating: 0,
      },
      {
        Resistance: "Water", Rating: 0,
      },
      {
        Resistance: "Fire", Rating: 0,
      },
      {
        Resistance: "Ice", Rating: 0,
      },
      {
        Resistance: "Thunder", Rating: 0,
      },
    ];

    if (getSelectedLoadout) {
      const fire = this.getSelectedLoadoutResist("fire");
      const water = this.getSelectedLoadoutResist("water");
      const thunder = this.getSelectedLoadoutResist("thunder");
      const ice = this.getSelectedLoadoutResist("ice");
      const dragon = this.getSelectedLoadoutResist("dragon");

      const updatedData = [
        Object.assign({}, defaultData[0], { Rating: dragon }),
        Object.assign({}, defaultData[1], { Rating: water }),
        Object.assign({}, defaultData[2], { Rating: fire }),
        Object.assign({}, defaultData[3], { Rating: ice }),
        Object.assign({}, defaultData[4], { Rating: thunder }),
      ];
      return updatedData;
    }
    return defaultData;
  }

  watchAttackData = () => {
    const { loadouts, weapons } = this.props;
    const { selectedLoadout } = this.state;
    const { builds } = loadouts;

    const weaponCheck = _.get(builds[selectedLoadout], "weapon_set.primary");

    if (weaponCheck) {
      const loadout = builds[selectedLoadout];
      const { primary } = loadout.weapon_set;
      const { attack, elements = [] } = weapons[primary];
      const attackPower = attack.display;
      const updatedData = [
        { Name: "Attack Power", Damage: attackPower },
      ];
      _.map(elements, (elem) => {
        updatedData.push({
          Name: inflection.capitalize(elem.type), Damage: elem.damage,
        });
      });

      return updatedData;
    }

    const defaultData = [
      { Name: "Attack Power", Damage: 0 },
    ];

    return defaultData;
  };

  generateWeaponSlot = (id) => {
    const { weapons, classes } = this.props;
    if (id) {
      return (
        <div className={classes.panel}>
          <div className={classes.inventoryPanel}>
            <img
              className={classes.inventoryImg}
              src={weapons[id].assets.image}
              alt={weapons[id].name}
            />
            <TextButton>
              <Typography
                style={{ padding: "16px 15px" }}
                variant="body1"
                onClick={() => this.setState({
                  openArmorModal: false,
                  openWeaponModal: true,
                  selectedWeapon: weapons[id],
                })}
                noWrap
              >
                {weapons[id].name}
              </Typography>
            </TextButton>
          </div>
        </div>
      );
    }
    return (
      <div className={classes.panel}>
        <div className={classes.inventoryPanel}>
          <p>Empty weapon slot</p>
        </div>
      </div>
    );
  };

  uploadLoadoutsToDb = async (builds) => {
    const clonedBuilds = Object.assign({}, builds);
    Object.keys(clonedBuilds).map(loadoutName => {
      delete clonedBuilds[loadoutName].armor_meta.defense;
      delete clonedBuilds[loadoutName].armor_meta.resistances;
    });

    const request = await postLoadoutsToDb(clonedBuilds);

    if (!request) {
      const dbUserLoadoutInfo = await getMyLoadouts();

      const { id } = dbUserLoadoutInfo;

      const newRequest = await putUpdatedLoadoutsToDb(clonedBuilds, id);
      return newRequest;
    }

    return request;
  }

  render() {
    const {
      classes, armors, loadouts, weapons,
    } = this.props;
    const { builds } = loadouts;

    const {
      searchingWeapon,
      openArmorModal,
      selectedArmorPiece,
      selectedLoadout,
      swapImage,
      openWeaponModal,
      selectedWeapon,
      openConfirmation,
    } = this.state;

    const armorColumns = [
      {
        id: "armorpiece",
        Header: "Armor name",
        accessor: "name",
        Cell: props => (
          <TextButton>
            <Typography
              variant="body1"
              onClick={() => this.setState({
                openArmorModal: true,
                openWeaponModal: false,
                selectedArmorPiece: props.original,
              })}
            >
              {props.value}
            </Typography>
          </TextButton>
        ),
        filterMethod: (filter, row) => matchSorter([row[filter.id]], filter.value).length !== 0,
      },
      this.generateColumn("type", true),
      this.generateColumn("rank", true),
      {
        Header: "Defense",
        accessor: "defense",
        Cell: props => (
          <Typography
            variant="body1"
            style={armorCells}
          >
            {props.value.base}
          </Typography>
        ),
      },
    ];

    const weaponColumns = [
      {
        id: "weaponpiece",
        Header: "Weapon name",
        accessor: "name",
        Cell: props => (
          <TextButton>
            <Typography
              variant="body1"
              onClick={() => this.setState({
                openArmorModal: false,
                openWeaponModal: true,
                selectedWeapon: props.original,
              })}
            >
              {props.value}
            </Typography>
          </TextButton>
        ),
        filterMethod: (filter, row) => matchSorter([row[filter.id]], filter.value).length !== 0,
      },
      {
        Header: "Type",
        accessor: "type",
        Cell: (props) => {
          const string = props.value.replace(/-/g, " ");
          const result = inflection.titleize(string);
          return (
            <Typography
              variant="body1"
              style={armorCells}
            >
              {result}
            </Typography>
          );
        },
      },
      this.generateColumn("rarity"),
      {
        Header: "Attack",
        accessor: "attack",
        Cell: props => (
          <Typography
            variant="body1"
            style={armorCells}
          >
            {props.value.display}
          </Typography>
        ),
      },
    ];

    return (
      <ChildGrid>
        <AppBar style={extendedTopbar}>
          <Toolbar
            style={extendedToolbar}
          >
            <IconButton
              style={{ color: lightGrey }}
              onClick={() => this.setState({ searchingWeapon: !searchingWeapon })}
            >
              {!searchingWeapon ? <ShieldAlt /> : <Gavel />}
            </IconButton>
            <TextField
              id={!searchingWeapon ? "armorpiece" : "weaponpiece"}
              type="text"
              fullWidth
              className={`${classes.textField} name-filter`}
              autoComplete="off"
              onChange={(event) => {
                if (!searchingWeapon) {
                  return (this.reactTable.current.filterColumn(
                    armorColumns[0], inflection.titleize(event.target.value),
                  ));
                }
                return (this.reactTable.current.filterColumn(
                  weaponColumns[0], inflection.titleize(event.target.value),
                ));
              }}
              InputProps={{
                className: classes.searchfield,
              }}
              placeholder={!searchingWeapon ? "Search armor piece..." : "Search a weapon..."}
            />
          </Toolbar>
          <Toolbar
            style={{
              paddingLeft: "120px",
              backgroundColor: darkishGrey,
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <section
              style={{
                minWidth: "400px",
                display: "flex",
                flexDirection: "row",
                flexWrap: "nowrap",
                paddingBottom: "5px",
              }}
            >
              <Formik
                initialValues={{ name: "" }}
                onSubmit={values => this.props.createLoadout(values.name)}
                render={({ values, handleChange, handleSubmit }) => (
                  <form
                    onSubmit={handleSubmit}
                  >
                    <TextField
                      className={`${classes.textField} name-filter`}
                      type="text"
                      name="name"
                      placeholder="Name"
                      value={values.name}
                      onChange={handleChange}
                      margin="normal"
                      variant="outlined"
                      InputProps={{
                        className: `${classes.field} ${classes.loadoutField}`,
                      }}
                      inputProps={{
                        "data-testid": "create-loadout-input",
                      }}
                    />
                    <Button
                      data-testid="create-loadout-submit-btn"
                      type="submit"
                      variant="contained"
                      color="secondary"
                      style={{
                        margin: "18px 0 0 8px",
                        textTransform: "none",
                        fontWeight: 600,
                        color: grey0,
                      }}
                    >
                      Create loadout
                    </Button>
                  </form>
                )}
              />
            </section>
            <section>
              <Scroll
                to="loadouts"
                smooth="true"
              >
                <Button style={scrollToBtns}>Loadouts</Button>
              </Scroll>
              <Scroll
                to="inventory"
                smooth="true"
              >
                <Button style={scrollToBtns}>Inventory</Button>
              </Scroll>
              <Scroll
                to="stats"
                smooth="true"
              >
                <Button style={scrollToBtns}>Stats</Button>
              </Scroll>
            </section>
          </Toolbar>
        </AppBar>
        <ExtendedView>
          <DeleteLoadoutModal
            openModal={openConfirmation}
            onClose={() => this.setState({ openConfirmation: false })}
            loadoutName={selectedLoadout}
          />
          <ArmorModal
            isArmorModalOpen={openArmorModal}
            onClose={() => this.setState({ openArmorModal: false })}
            armorData={selectedArmorPiece}
          />
          <WeaponModal
            isWeaponModalOpen={openWeaponModal}
            onClose={() => this.setState({ openWeaponModal: false })}
            weaponData={selectedWeapon}
          />
          <ArmorsTable>
            <ReactTable
              className="-hightlight"
              style={rTable}
              columns={
                !searchingWeapon
                  ? armorColumns
                  : weaponColumns
              }
              data={
                !searchingWeapon
                  ? Object.values(armors)
                  : Object.values(weapons)
              }
              ref={this.reactTable}
            />
          </ArmorsTable>
          <div
            className={
              `${classes.loadoutInventoryBlock} ${"forge-content"}`
            }
          >
            <main
              className={classes.loadoutBlock}
              id="loadouts"
            >
              <header className={classes.panelHeader}>
                Loadouts
                {" "}
                <IconButton
                  style={{
                    padding: "0",
                    color: grey5,
                    background: primary2,
                  }}
                  onClick={() => this.props.retrieveMyLoadouts()}
                  type="button"
                >
                  <Refresh />
                </IconButton>
              </header>
              <section className={classes.loadoutElements}>
                {
                  Object.entries(builds).length === 0
                    ? <div style={{ textAlign: "center" }}>
                      <LinearProgress style={{ background: "hsl(207, 13%, 18%)" }} />
                      <Typography
                        variant="body1"
                        className="flexCenter"
                        style={{
                          height: "324px",
                          display: "flex",
                          fontWeight: 600,
                          color: greyCard,
                        }}
                      >
                        Retrieving any loadouts
                        </Typography>
                    </div>
                    : Object.keys(builds).map(loadout => (
                      <div
                        key={loadout}
                        className={classes.panel}
                      >
                        <p>{loadout}</p>
                        <div style={{ height: "min-content", marginTop: "6px" }}>
                          <Button
                            style={{ color: danger1, textTransform: "none" }}
                            onClick={async () => {
                              await this.setState({ selectedLoadout: loadout });

                              if (this.state.selectedLoadout === loadout) {
                                this.setState({ openConfirmation: true });
                              }
                            }}
                          >
                            Delete
                          </Button>
                          {" "}
                          <Button
                            style={{ textTransform: "none" }}
                            onClick={async () => {
                              await this.setState({ selectedLoadout: loadout });
                            }}
                            // disabled
                            color="secondary"
                            variant="contained"
                          >
                            Select
                          </Button>
                        </div>
                      </div>
                    ))
                }
              </section>
              <footer
                style={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Button
                  onClick={async () => {
                    await this.uploadLoadoutsToDb(builds);
                  }}
                  color="secondary"
                  variant="contained"
                  style={{ textTransform: "none" }}
                >
                  Save all loadouts to database
                </Button>
              </footer>
            </main>
            <main
              className={classes.loadoutBlock}
              id="inventory"
            >
              <header className={classes.panelHeader}>
                Inventory
                {" "}
                <IconButton
                  style={{
                    padding: "0",
                    color: grey5,
                    background: primary2,
                  }}
                  onClick={() => this.setState({ swapImage: !swapImage })}
                  type="button"
                >
                  <Cached />
                </IconButton>
              </header>
              <section className={classes.loadoutElements}>
                {
                  this.generateArmorSlot(_.get(builds[selectedLoadout], "armor_set.head"), "head")
                }
                {
                  this.generateArmorSlot(_.get(builds[selectedLoadout], "armor_set.chest"), "chest")
                }
                {
                  this.generateArmorSlot(_.get(builds[selectedLoadout], "armor_set.waist"), "waist")
                }
                {
                  this.generateArmorSlot(_.get(builds[selectedLoadout], "armor_set.legs"), "legs")
                }
                {
                  this.generateArmorSlot(_.get(builds[selectedLoadout], "armor_set.gloves"), "gloves")
                }
                {
                  this.generateWeaponSlot(_.get(builds[selectedLoadout], "weapon_set.primary"))
                }
              </section>
            </main>
            <main
              className={classes.overallStatsBlock}
              id="stats"
            >
              <header className={classes.panelHeader}>Overall Stats</header>
              <div className={classes.overallStatsElems}>
                <Panel
                  title="Defense ratings"
                  classesProp={{ root: "custom-panel" }}
                  CardHeaderProps={{ backgroundColor: darkBlue1 }}
                  whiteHeaderText
                  spaceBetweenPanels
                >
                  <CustomBarChart
                    data={this.watchDefData()}
                    XAxisLabel="Defense"
                    YAxisLabel="Rating"
                    dataKey="Rating"
                    style={{ padding: "29px 0 12px 0" }}
                  />
                </Panel>
                <Panel
                  title="Elemental resistances"
                  classesProp={{ root: "custom-panel" }}
                  CardHeaderProps={{ backgroundColor: darkBlue1 }}
                  whiteHeaderText
                  spaceBetweenPanels
                >
                  <CustomBarChart
                    data={this.watchResistData()}
                    XAxisLabel="Resistance"
                    YAxisLabel="Rating"
                    dataKey="Rating"
                    style={{ padding: "29px 0 12px 0" }}
                  />
                </Panel>
                <Panel
                  title="Damage ratings"
                  classesProp={{ root: "custom-panel" }}
                  CardHeaderProps={{ backgroundColor: darkBlue1 }}
                  whiteHeaderText
                  spaceBetweenPanels
                >
                  <CustomBarChart
                    data={this.watchAttackData()}
                    XAxisLabel="Name"
                    YAxisLabel="Damage"
                    dataKey="Damage"
                    style={{ padding: "29px 0 12px 0" }}
                  />
                </Panel>
              </div>
            </main>
          </div>
        </ExtendedView>
      </ChildGrid>
    );
  }
}

const componentWithStyles = withStyles(armorsStyles)(Forge);

const mapStateToProps = state => ({
  weapons: state.warehouse.weapons,
  armors: state.warehouse.armors,
  loadouts: state.loadouts,
});

const mapDispatchToProps = dispatch => ({
  retrieveAllArmors: bindActionCreators(retrieveAllArmors, dispatch),
  retrieveAllWeapons: bindActionCreators(retrieveAllWeapons, dispatch),
  createLoadout: bindActionCreators(createLoadout, dispatch),
  retrieveMyLoadouts: bindActionCreators(retrieveMyLoadouts, dispatch),
  retrieveDbLoadouts: bindActionCreators(retrieveDbLoadouts, dispatch),
  setLocalArmors: bindActionCreators(setLocalArmors, dispatch),
  setLocalWeapons: bindActionCreators(setLocalWeapons, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(componentWithStyles);
