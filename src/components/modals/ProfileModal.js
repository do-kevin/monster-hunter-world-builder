import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Typography, withStyles, Card, CardContent,
  CardActions, IconButton, Button,
} from "@material-ui/core";
import inflection from "inflection";
import { slidingModalStyles } from "Styles";
import { SlidingModal } from "components/modals";
import _ from "lodash";
import { Panel } from "components/panels";
import CustomBarChart from "components/charts/CustomBarChart";
import ProfileModalAvatar from "components/frames/ProfileModalAvatar";
import EquipmentPreview from "components/frames/EquipmentPreview";
import { Close } from "components/icons/MuiIconsDx";
import {
  darkBlue1, grey4, grey0,
} from "Colors";

const CustomBarChartPadding = { padding: "29px 0 12px 0" };

class ProfileModal extends Component {
  state = {
    selectedLoadout: "",
    mediaQuery: false,
  };

  componentDidMount() {
    window.addEventListener("resize", this.handleMediaQuery);
    this.handleMediaQuery();
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleMediaQuery);
  }

  handleMediaQuery = () => {
    if (window.innerWidth <= 1340) {
      this.setState({ mediaQuery: true });
    } else {
      this.setState({ mediaQuery: false });
    }
  }

  watchDefData = () => {
    const { myLoadoutsData } = this.props;
    const { data = {} } = myLoadoutsData;
    const { builds = {} } = data;
    const myLoadouts = builds;

    const { selectedLoadout } = this.state;

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

    if (myLoadouts[selectedLoadout]) {
      const loadout = myLoadouts[selectedLoadout];
      const { base, max, augmented } = loadout.armor_meta.defense;
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
    const { myLoadoutsData } = this.props;
    const { data = {} } = myLoadoutsData;
    const { builds = {} } = data;
    const myLoadouts = builds;

    const { selectedLoadout } = this.state;

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

    if (myLoadouts[selectedLoadout]) {
      const loadout = myLoadouts[selectedLoadout];
      const {
        fire, water, ice, thunder, dragon,
      } = loadout.armor_meta.resistances;
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
    const { myLoadoutsData, weapons } = this.props;
    const { data = {} } = myLoadoutsData;
    const { builds = {} } = data;
    const myLoadouts = builds;

    const { selectedLoadout } = this.state;

    const weaponCheck = _.get(myLoadouts[selectedLoadout], "weapon_set.primary");

    if (weaponCheck) {
      const loadout = myLoadouts[selectedLoadout];
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

  handleEquipImages = () => {
    const { myLoadoutsData } = this.props;
    const { data = {} } = myLoadoutsData;
    const { builds = {} } = data;
    const myLoadouts = builds;

    const { selectedLoadout } = this.state;

    const armorSet = _.get(myLoadouts[selectedLoadout], "armor_set");
    const weaponSet = _.get(myLoadouts[selectedLoadout], "weapon_set");

    const newData = Object.assign({}, armorSet, {
      weapon: weaponSet,
    });
    return newData;
  }

  render() {
    const {
      classes, modalData, openModal, onClose, onClickClose, myLoadoutsData = {},
    } = this.props;
    const name = modalData[0];
    const otherProfileInfo = modalData[1];
    const { birth_date, phone_number } = otherProfileInfo;
    const { data = {} } = myLoadoutsData;
    const { builds = {} } = data;
    const myLoadouts = builds;

    const { mediaQuery } = this.state;

    return (
      <SlidingModal
        isModalOpen={openModal}
        onClose={onClose}
        classesProp={{ root: classes.content }}
      >
        <Card
          className={
            mediaQuery
              ? classes.mediaQueryCard
              : classes.card
          }
          classes={{ className: "responsive-card2" }}
        >
          <CardContent
            style={{
              display: "flex",
              flexDirection: "row",
              backgroundColor: grey4,
            }}
          >
            <section>
              <ProfileModalAvatar
                src={`https://randomuser.me/api/portraits/men/${Math.floor(Math.random() * 100)}.jpg`}
              />
            </section>
            <section style={{ marginLeft: "15px" }}>
              <Typography
                variant="h3"
                style={{ color: grey0 }}
              >
                {name}
              </Typography>
              <Typography
                variant="h5"
                style={{ color: grey0 }}
              >
                {birth_date}
              </Typography>
              <Typography
                variant="h6"
                style={{ color: grey0 }}
              >
                {phone_number}
              </Typography>
            </section>
          </CardContent>
          <CardContent className={classes.infoBlock}>
            <section>
              <header style={{ textAlign: "center", color: grey0 }}>Loadouts</header>
              <div className={classes.loadoutsContainer}>
                {
                  Object.keys(myLoadouts).map((loadoutName) => {
                    const selectLoadout = (
                      <Button
                        style={{ margin: 5 }}
                        variant="contained"
                        key={loadoutName}
                        type="button"
                        onClick={() => this.setState({ selectedLoadout: loadoutName })}
                      >
                        {loadoutName}
                      </Button>
                    );
                    return selectLoadout;
                  })
                }
              </div>
            </section>
            <EquipmentPreview loadoutData={this.handleEquipImages()} />
          </CardContent>
          <CardContent
            className={`${classes.panelsContainer}`}
          >
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
                style={CustomBarChartPadding}
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
                style={CustomBarChartPadding}
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
                style={CustomBarChartPadding}
              />
            </Panel>
          </CardContent>
          <CardActions
            className="responsive-card__actions"
            style={{
              backgroundColor: grey4,
              position: "relative",
            }}
          >
            <IconButton
              className={classes.closeModalBtn}
              onClick={() => onClickClose()}
            >
              <Close />
            </IconButton>
          </CardActions>
        </Card>
      </SlidingModal>
    );
  }
}

const componenetWithStyles = withStyles(slidingModalStyles)(ProfileModal);

const mapStateToProps = state => ({ weapons: state.warehouse.weapons });

export default connect(mapStateToProps)(componenetWithStyles);
