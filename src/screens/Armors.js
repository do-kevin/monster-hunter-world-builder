/* eslint-disable react/no-unused-state */
import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
  AppBar, Toolbar, TextField, withStyles, IconButton, Typography,
} from "@material-ui/core";
import { Search, Cancel } from "@material-ui/icons";
import ReactTable from "react-table";
import inflection from "inflection";
import { retrieveAllArmors } from "store/ducks/MonsterHunter";
import {
  ChildGrid, toolbar, topbar, View, rTable, ArmorsTable, armorsStyles,
  TextButton, armorCells,
} from "screens/Styles";
import ArmorModal from "components/ArmorModal";
// import _ from "lodash";
// import { denormalize, schema } from "normalizr";

class Armors extends Component {
  constructor(props) {
    super(props);
    this.reactTable = React.createRef();
    this.state = {
      isSearching: false,
      openArmorModal: false,
      selectedArmorPiece: {},
    };
  }

  async componentDidMount() {
    console.log("componentDidMount fired");
    const { retrieveAllArmors } = this.props;
    await retrieveAllArmors();
  }

  render() {
    const { classes, armors } = this.props;


    const {
      isSearching,
      openArmorModal,
      selectedArmorPiece,
    } = this.state;

    const columns = [
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

    return (
      <ChildGrid>
        <AppBar style={topbar}>
          <Toolbar style={toolbar}>
            <IconButton onClick={() => this.setState({ isSearching: !isSearching })}>
              {!isSearching ? <Search /> : <Cancel /> }
            </IconButton>
            {
              isSearching
                ? (
                  <TextField
                    id="armorpiece"
                    type="text"
                    fullWidth
                    className={`${classes.textField} name-filter`}
                    autoComplete="off"
                    onChange={event => (
                      this.reactTable.current.filterColumn(columns[0], inflection.titleize(event.target.value))
                    )}
                    InputProps={{
                      className: classes.searchfield,
                    }}
                    placeholder="Search armor piece..."
                  />
                )
                : null
            }
          </Toolbar>
        </AppBar>
        <View>
          <ArmorModal
            isOpen={openArmorModal}
            onClose={() => this.setState({ openArmorModal: false })}
            armorData={selectedArmorPiece}
          />
          <ArmorsTable>
            <ReactTable
              className="-hightlight"
              style={rTable}
              columns={columns}
              data={Object.values(armors)}
              ref={this.reactTable}
            />
          </ArmorsTable>
        </View>
      </ChildGrid>
    );
  }
}

const componentWithStyles = withStyles(armorsStyles)(Armors);

const mapStateToProps = (state) => {
  console.log(state);
  return {
    armors: state.armors,
  };
};

const mapDispatchToProps = dispatch => ({
  retrieveAllArmors: bindActionCreators(retrieveAllArmors, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(componentWithStyles);
