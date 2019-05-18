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
  ChildGrid, ExtendedView, rTable, ArmorsTable, armorsStyles,
  TextButton, armorCells, extendedTopbar, extendedToolbar,
} from "screens/Styles";
import ArmorModal from "components/ArmorModal";

const scrollToBtns = {
  color: "hsl(205,11%,80%)",
  textTransform: "none",
  fontWeight: 600,
};

class Armors extends Component {
  constructor(props) {
    super(props);
    this.reactTable = React.createRef();
    this.state = {
      searchingWeapon: false,
      openArmorModal: false,
      selectedArmorPiece: {},
      selectedLoadout: undefined,
      swapImage: false,
    };
  }

  async componentDidMount() {
    const { retrieveAllArmors, retrieveAllWeapons } = this.props;
    await retrieveAllArmors();
    await retrieveAllWeapons();
  }

  getArmorInfo = (id) => {
    const { armors, classes } = this.props;
    const { swapImage } = this.state;
    if (id) {
      return (
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
              noWrap="true"
            >
              {armors[id].name}
            </Typography>
          </TextButton>
        </div>
      );
    }
    return <p>Empty Slot</p>;
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
                selectedArmorPiece: props.original,
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
        Cell: props => (
          <Typography
            variant="body1"
            style={armorCells}
          >
            {inflection.capitalize(props.value)}
          </Typography>
        ),
      },
      {
        Header: "Rank",
        accessor: "rank",
        Cell: props => (
          <Typography
            variant="body1"
            style={armorCells}
          >
            {inflection.capitalize(props.value)}
          </Typography>
        ),
      },
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
      {
        Header: "Attack",
        accessor: "attack",
        Cell: props => (
          <Typography
            variant="body1"
            style={armorCells}
          >
            {props.value.raw}
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
              style={{ color: "hsl(0, 0%, 77%)" }}
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
              backgroundColor: "hsl(207, 11%, 29%)",
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
                        color: "hsl(0, 0%, 100%)",
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
            isOpen={openArmorModal}
            onClose={() => this.setState({ openArmorModal: false })}
            armorData={selectedArmorPiece}
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
                        onClick={() => this.setState({ selectedLoadout: loadout })}
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
                    color: "hsl(205,11%,80%)",
                    background: "hsl(249, 9%, 15%)",
                  }}
                  onClick={() => this.setState({ swapImage: !swapImage })}
                  type="button"
                >
                  <Cached />
                </IconButton>
              </header>
              <section className={classes.loadoutElements}>
                <div className={classes.panel}>
                  {
                    builds[selectedLoadout] !== undefined
                      ? this.getArmorInfo(builds[selectedLoadout].armor_set.head)
                      : <p>Empty Slot</p>
                  }
                </div>
                <div className={classes.panel}>
                  {
                    builds[selectedLoadout] !== undefined
                      ? this.getArmorInfo(builds[selectedLoadout].armor_set.chest)
                      : <p>Empty Slot</p>
                  }
                </div>
                <div className={classes.panel}>
                  {
                    builds[selectedLoadout] !== undefined
                      ? this.getArmorInfo(builds[selectedLoadout].armor_set.waist)
                      : <p>Empty Slot</p>
                  }
                </div>
                <div className={classes.panel}>
                  {
                    builds[selectedLoadout] !== undefined
                      ? this.getArmorInfo(builds[selectedLoadout].armor_set.legs)
                      : <p>Empty Slot</p>
                  }
                </div>
                <div className={classes.panel}>
                  {
                    builds[selectedLoadout] !== undefined
                      ? this.getArmorInfo(builds[selectedLoadout].armor_set.gloves)
                      : <p>Empty Slot</p>
                  }
                </div>
              </section>
            </main>
          </div>
        </ExtendedView>
      </ChildGrid>
    );
  }
}

const componentWithStyles = withStyles(armorsStyles)(Armors);

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
