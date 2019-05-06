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
  TextButton,
} from "screens/Styles";
import ArmorModal from "components/ArmorModal";

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
    const { retrieveAllArmors } = this.props;
    retrieveAllArmors();
  }

  render() {
    const { armors, classes } = this.props;
    const { isSearching, openArmorModal, selectedArmorPiece } = this.state;

    const columns = [
      {
        id: "armorpiece",
        Header: "Armor name",
        accessor: "name",
        Cell: (props) => (
            <TextButton>
              <Typography
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
      },
      {
        Header: "Rank",
        accessor: "rank",
      },
    ];

    return (
      <ChildGrid>
        <div style={{ gridArea: "topbar" }} />
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
                    fullWidth="true"
                    className={`${classes.TextField} name-filter`}
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
              data={armors}
              ref={this.reactTable}
            />
          </ArmorsTable>
        </View>
      </ChildGrid>
    );
  }
}

const componentWithStyles = withStyles(armorsStyles)(Armors);

const mapStateToProps = state => ({ armors: state.armors });

const mapDispatchToProps = dispatch => ({
  retrieveAllArmors: bindActionCreators(retrieveAllArmors, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(componentWithStyles);
