import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
  AppBar, Toolbar, TextField, withStyles, IconButton, Typography, Button,
} from "@material-ui/core";
import { Cached } from "@material-ui/icons";
import { Link as Scroll } from "react-scroll";
import ReactTable from "react-table";
import matchSorter from "match-sorter";
import inflection from "inflection";
import { Formik } from "formik";
import { retrieveAllArmors, retrieveAllWeapons } from "store/ducks/Warehouse";
import { createLoadout } from "store/ducks/Loadouts";
import {
  ChildGrid, ExtendedView, ArmorsTable, TextButton,
} from "components/StyledComponents";
import {
  rTable, armorsStyles,
  armorCells, extendedTopbar, extendedToolbar,
} from "Styles";
import { ArmorModal, WeaponModal } from "components/modals";
import _ from "lodash";
import {
  grey0, grey5, lightGrey, darkishGrey, primary2,
} from "Colors";

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
    };
  }

  async componentDidMount() {
    const { retrieveAllArmors, retrieveAllWeapons } = this.props;
    await retrieveAllArmors();
    await retrieveAllWeapons();
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

  render() {
    const {
      classes, armors, createLoadout, loadouts,
      weapons,
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
              {!searchingWeapon ? <i className="fas fa-shield-alt" /> : <i className="fas fa-gavel" />}
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
                        className: `${classes.field} ${classes.loadoutField}`,
                      }}
                    />
                    <Button
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
            </section>
          </Toolbar>
        </AppBar>
        <ExtendedView>
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
          <div className={classes.loadoutInventoryBlock}>
            <main
              className={classes.loadoutBlock}
              id="loadouts"
            >
              <header className={classes.panelHeader}>
                Loadouts
              </header>
              <section className={classes.loadoutElements}>
                {
                  Object.keys(builds).map(loadout => (
                    <div
                      key={loadout}
                      className={classes.panel}
                    >
                      <p>{loadout}</p>
                      <Button
                        onClick={async () => {
                          await this.setState({ selectedLoadout: loadout });
                        }}
                        color="secondary"
                        variant="contained"
                      >
                        Select
                      </Button>
                    </div>
                  ))
                }
              </section>
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
            <main className={classes.loadoutBlock}>
              <header className={classes.panelHeader}>
                Overall Stats
              </header>
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
});

export default connect(mapStateToProps, mapDispatchToProps)(componentWithStyles);
