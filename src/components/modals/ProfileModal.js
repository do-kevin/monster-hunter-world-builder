import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Typography, withStyles, Card, CardMedia, Avatar, CardContent,
} from "@material-ui/core";
import inflection from "inflection";
import { slidingModalStyles } from "Styles";
import { SlidingModal } from "components/modals";
import _ from "lodash";
import { Panel } from "components/panels";
import CustomBarChart from "components/charts/CustomBarChart";
import {
  darkBlue1,
} from "Colors";

class ProfileModal extends Component {
  state = {
    selectedLoadout: "",
  };

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

  render() {
    const {
      classes, modalData, openModal, onClose, onClickClose, myLoadoutsData = {}, weapons,
    } = this.props;
    const name = modalData[0];
    const otherProfileInfo = modalData[1];
    const { birth_date, phone_number } = otherProfileInfo;
    const { data = {} } = myLoadoutsData;
    const { builds = {} } = data;
    const myLoadouts = builds;

    return (
      <SlidingModal
        isModalOpen={openModal}
        onClose={onClose}
        classesProp={{ root: classes.content }}
      >
        <Card className={classes.card}>
          <CardMedia
            className={classes.media}
            src={`https://randomuser.me/api/portraits/men/${Math.floor(Math.random() * 100)}.jpg`}
          >
            <Avatar
              className={classes.innerAvatar}
              src={`https://randomuser.me/api/portraits/men/${Math.floor(Math.random() * 100)}.jpg`}
              alt="avatar placeholder"
            />
          </CardMedia>
          <CardContent>
            <Typography variant="h5">{name}</Typography>
            <Typography variant="subtitle1">
              {birth_date}
            </Typography>
            <Typography variant="subtitle2">
              {phone_number}
            </Typography>
            <button onClick={onClickClose} type="button">Close</button>
          </CardContent>
          <CardContent>
            {
              Object.keys(myLoadouts).map((loadoutName) => {
                const selectLoadout = (
                  <button
                    key={loadoutName}
                    type="button"
                    onClick={() => this.setState({ selectedLoadout: loadoutName })}
                  >
                    {loadoutName}
                  </button>
                );
                return selectLoadout;
              })
            }
          </CardContent>
          <CardContent
            style={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
            }}
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
          </CardContent>
        </Card>
      </SlidingModal>
    );
  }
}

const componenetWithStyles = withStyles(slidingModalStyles)(ProfileModal);

const mapStateToProps = state => ({ weapons: state.warehouse.weapons });

export default connect(mapStateToProps)(componenetWithStyles);
