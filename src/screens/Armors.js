import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { AppBar, Toolbar } from "@material-ui/core";

import { retrieveAllArmors } from "store/ducks/MonsterHunter";
import {
  ChildGrid, toolbar, searchbar, view,
} from "screens/ArmorsStyles";
import ItemCard from "components/ItemCard";

class Armors extends Component {
  async componentDidMount() {
    const { retrieveAllArmors } = this.props;
    retrieveAllArmors();
  }

  render() {
    const { armors } = this.props;

    return (
      <ChildGrid>
        <div style={{ gridArea: "sidebar" }} />
        <AppBar style={searchbar}>
          <Toolbar style={toolbar}>
            <p>Placeholder</p>
          </Toolbar>
        </AppBar>
        <main style={view}>
          {
           armors.map(data => <ItemCard key={data.id} data={data} />)
          }
        </main>
      </ChildGrid>
    );
  }
}

const mapStateToProps = state => ({ armors: state.armors });

const mapDispatchToProps = dispatch => ({
  retrieveAllArmors: bindActionCreators(retrieveAllArmors, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Armors);
