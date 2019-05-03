/* eslint-disable react/destructuring-assignment */
import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
  withStyles, AppBar, Toolbar, Typography, Button, Avatar,
  TextField, InputAdornment,
} from "@material-ui/core";
import { Refresh, Search } from "@material-ui/icons";
import ReactTable from "react-table";
import matchSorter from "match-sorter";
import inflection from "inflection";

import { retrieveUserList } from "store/ducks/List";
import { bigStyles, StyledTable, TextButton } from "screens/DashboardStyles";
import ModalCard from "components/ModalCard";

const defaultState = {
  selectedUser: [
    "",
    {
      birth_date: "",
      phone_number: "",
    },
  ],
  openModal: false,
};

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.reactTable = React.createRef();
  }

  state = defaultState;

  async componentDidMount() {
    this.refreshList();
  }

  refreshList = () => {
    const { retrieveUserList } = this.props;
    this.setState(defaultState);
    retrieveUserList();
  }

  generateColumn = (key = "", filterable = false, show = true) => {
    const { classes } = this.props;
    const newCell = {
      id: inflection.camelize(key, key.charAt(0)),
      Header: inflection.humanize(key),
      accessor: key,
      filterable,
      show,
      Cell: d => (
        <Typography
          variant="body1"
          className={classes.cellStyles}
        >
          {d.value}
        </Typography>
      ),
    };
    return newCell;
  }

  render() {
    const { classes, list } = this.props;
    const columns = [
      {
        Header: "",
        Cell: () => (
          <Avatar
            className={classes.smallAvatar}
            src={`https://randomuser.me/api/portraits/men/${Math.floor(Math.random() * 100)}.jpg`}
            alt="avatar placeholder"
          />
        ),
        filterable: false,
      },
      {
        id: "fullName",
        Header: "Full name",
        accessor: d => `${d.first_name} ${d.last_name}`,
        Cell: (props) => {
          const userData = [
            props.value,
            props.original,
          ];

          return (
            <TextButton>
              <Typography
                onClick={() => {
                  this.setState({
                    selectedUser: userData,
                    openModal: true,
                  });
                }}
                variant="body1"
              >
                {props.value}
              </Typography>
            </TextButton>
          );
        },
        filterMethod: (filter, row) => matchSorter([row[filter.id]], filter.value).length !== 0,
      },
      this.generateColumn("first_name", false, false),
      this.generateColumn("last_name", false, false),
      this.generateColumn("birth_date"),
      this.generateColumn("phone_number"),
    ];

    return (
      <div className="dashboard-grid">
        <div style={{ gridArea: "nav" }} />
        <AppBar className={classes.topbar}>
          <Toolbar className={classes.toolbar}>
            <Button
              onClick={() => this.refreshList()}
              color="secondary"
              className={classes.refreshBtn}
            >
              <Refresh />
              {" "}
              Refresh list
            </Button>
            <TextField
              id="fullName"
              type="text"
              className={`${classes.TextField} name-filter`}
              autoComplete="off"
              onChange={event => (
                this.reactTable.current.filterColumn(columns[1], event.target.value)
              )}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
                className: classes.fullNameFilter,
              }}
              placeholder="Search by name..."
              variant="outlined"
            />
          </Toolbar>
        </AppBar>
        <main className={classes.rtWrapper}>
          <ModalCard
            modalData={this.state.selectedUser}
            openModal={this.state.openModal}
            onClose={() => this.setState({ openModal: false })}
          />
          <StyledTable>
            <ReactTable
              ref={this.reactTable}
              className={`${classes.table} -highlight`}
              data={list}
              columns={columns}
            />
          </StyledTable>
        </main>
      </div>
    );
  }
}

const componentWithStyles = withStyles(bigStyles)(Dashboard);

const mapStateToProps = state => ({ list: state.list });

const mapDispatchToProps = dispatch => ({
  retrieveUserList: bindActionCreators(retrieveUserList, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(componentWithStyles);
