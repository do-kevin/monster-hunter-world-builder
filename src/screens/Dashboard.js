/* eslint-disable react/destructuring-assignment */
import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
  withStyles, AppBar, Toolbar, Modal, Button, Avatar,
  Card, CardContent, CardMedia, Typography, Slide,
  TextField, InputAdornment,
} from "@material-ui/core";
import { Refresh, Search } from "@material-ui/icons";
import ReactTable from "react-table";
import matchSorter from "match-sorter";
import inflection from "inflection";

import { listAllProfiles } from "services/ProfileApi";
import { grabUserList, clearUserList } from "store/ducks/List";
import { bigStyles, StyledTable, TextButton } from "screens/DashboardStyles";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.reactTable = React.createRef();
  }

  state = {};

  async componentDidMount() {
    this.refreshList(this.props);
  }

  refreshList = async (props) => {
    const { setUserList } = props;
    await clearUserList();
    const response = await listAllProfiles();
    setUserList(response);
    response.map((result) => {
      const { user } = result;
      Object.assign(this.state, { [`modal${user}`]: false });
      return false;
    });
  }

  toggleModal = (userId) => {
    this.setState({
      [`modal${userId}`]: !this.state[`modal${userId}`],
    });
  }

  generateColumn = (props, key = "", filterable = false, show = true) => {
    const { classes } = props;
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
          const { birth_date, phone_number } = props.original;
          const userId = props.original.user;
          return (
            <div>
              <TextButton>
                <Typography
                  onClick={() => this.toggleModal(userId)}
                  variant="body1"
                >
                  {props.value}
                </Typography>
              </TextButton>
              <Modal
                className="flexCenter"
                open={
                  this.state[`modal${userId}`] === undefined ? false : this.state[`modal${userId}`]
                }
                onClose={() => { this.toggleModal(userId); }}
              >
                <Slide
                  direction="up"
                  in={this.state[`modal${userId}`]}
                  mountOnEnter
                  unmountOnExit
                >
                  <Card
                    className={`${classes.card}`}
                  >
                    <CardMedia
                      className={classes.media}
                    >
                      <Avatar
                        className={classes.innerAvatar}
                        src={`https://randomuser.me/api/portraits/men/${Math.floor(Math.random() * 100)}.jpg`}
                        alt="avatar placeholder"
                      />
                    </CardMedia>
                    <CardContent>
                      <Typography variant="h5">{props.value}</Typography>
                      <Typography variant="subtitle1">{birth_date}</Typography>
                      <Typography variant="subtitle2">{phone_number}</Typography>
                    </CardContent>
                  </Card>
                </Slide>
              </Modal>
            </div>
          );
        },
        filterMethod: (filter, row) => matchSorter([row[filter.id]], filter.value).length !== 0,
      },
      this.generateColumn(this.props, "first_name", false, false),
      this.generateColumn(this.props, "last_name", false, false),
      this.generateColumn(this.props, "birth_date"),
      this.generateColumn(this.props, "phone_number"),
    ];

    return (
      <div className="dashboard-grid">
        <div style={{ gridArea: "nav" }} />
        <AppBar className={classes.topbar}>
          <Toolbar className={classes.toolbar}>
            <Button
              onClick={() => this.refreshList(this.props)}
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

function mapStateToProps(state) {
  const { list } = state;
  return {
    list,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setUserList: bindActionCreators(grabUserList, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(componentWithStyles);
