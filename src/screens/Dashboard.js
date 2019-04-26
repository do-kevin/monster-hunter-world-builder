/* eslint-disable react/destructuring-assignment */
import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
  withStyles, AppBar, Toolbar, Modal, Button, Avatar,
  Card, CardContent, CardMedia, Typography, Slide,
  TextField, InputAdornment,
} from "@material-ui/core";
import styled from "styled-components";
import { Refresh, Search } from "@material-ui/icons";
import ReactTable from "react-table";
import { listAllProfiles } from "services/ProfileApi";
import { grabUserList, clearUserList } from "redux/state/list/Actions";

const StyledTable = styled.div`
  .rt-tbody {
    text-align: left;
  }
  .rt-resizable-header-content {
    color: hsl(195, 86%, 40%);
    font-size: 18px;
  }
  .rt-tr-group {
    .rt-tr {
      .rt-td:first-child {
        flex: 28 !important;
      }
      .rt-td:nth-child(2) {
        padding: 16px;
      }
    }
  }
  .rt-thead {
    .rt-tr {
      .rt-th:first-child {
        flex: 28 !important;
      }
      .rt-th:not(first-child) {
        text-align: left;
        div:first-child {
          padding: 3px 0 3px 13px;
        }
      }
    }
  }
  .rt-td {
    border-bottom: 1px solid hsl(0, 0%, 85%);
  }
`;

const styles = () => ({
  topbar: {
    height: "70px",
    background: "hsl(205, 11%, 31%)",
    width: "100%",
  },
  toolbar: {
    paddingLeft: "120px",
    display: "flex",
    flexDirection: "row-reverse",
  },
  rtWrapper: {
    width: "97.2vw",
    padding: "20px 20px",
  },
  table: {
    minWidth: "900px",
    maxWidth: "1200px",
    left: "56px",
    background: "hsl(0, 0%, 100%)",
    height: "100vh",
    top: "-10px",
    borderRadius: "5px",
  },
  smallAvatar: {
    height: "50px",
    width: "50px",
    borderRadius: "50%",
  },
  innerAvatar: {
    position: "relative",
    height: "130px",
    width: "130px",
    left: "83px",
    top: "34px",
    borderRadius: "50%",
    boxShadow: "0 2px 10px hsl(219, 61%, 26%)",
  },
  card: {
    width: "300px",
    outline: "none",
  },
  media: {
    height: "200px",
    background: "linear-gradient(to bottom right, hsl(161, 100%, 61%), hsl(219, 61%, 53%), hsl(235, 100%, 50%))",
  },
  fullNameFilter: {
    background: "hsl(205, 11%, 42%)",
    borderRadius: "4px",
    height: "33px",
    color: "white",
    fontWeight: 600,
    marginRight: "10px",
  },
  cellStyles: {
    fontWeight: 600,
    padding: "14px",
  },
});

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

  openModal = (userId) => {
    this.setState({
      [`modal${userId}`]: true,
    });
  }

  closeModal = (userId) => {
    this.setState({
      [`modal${userId}`]: false,
    });
  }

  render() {
    const { classes, people } = this.props;

    const columns = [
      {
        Header: "",
        Cell: () => (
          <Avatar
            className={`${classes.smallAvatar} table-avatar`}
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
              <Button
                onClick={() => this.openModal(userId)}
                variant="text"
                color="secondary"
                style={{
                  textTransform: "none",
                  fontWeight: 600,
                  color: "hsl(0, 0%, 0%)",
                  paddingLeft: "3px",
                  paddingRight: "3px",
                }}
              >
                {props.value}
              </Button>
              <Modal
                className="flexCenter"
                open={this.state[`modal${userId}`]}
                onClose={() => { this.closeModal(userId); }}
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
        filterMethod: (filter, row) => {
          const id = filter.pivotId || filter.id;
          if (row.firstName.startsWith(filter.value)) {
            return String(row.firstName).startsWith(filter.value);
          }
          if (row.lastName.startsWith(filter.value)) {
            return String(row.lastName).startsWith(filter.value);
          }
          return row[id] !== undefined ? String(row[id]).startsWith(filter.value) : true;
        },
      },
      {
        id: "firstName",
        Header: "First name",
        accessor: "first_name",
        Cell: props => (
          <Typography
            variant="body1"
            className={classes.cellStyles}
          >
            {props.value}
          </Typography>
        ),
        show: false,
      },
      {
        id: "lastName",
        Header: "Last name",
        accessor: "last_name",
        Cell: props => (
          <Typography
            variant="body1"
            className={classes.cellStyles}
          >
            {props.value}
          </Typography>
        ),
        show: false,
      },
      {
        Header: "Birth date",
        accessor: "birth_date",
        Cell: props => (
          <Typography
            variant="body1"
            className={classes.cellStyles}
          >
            {props.value}
          </Typography>
        ),
        filterable: false,
      },
      {
        Header: "Phone number",
        accessor: "phone_number",
        Cell: props => (
          <Typography
            variant="body1"
            className={classes.cellStyles}
          >
            {props.value}
          </Typography>
        ),
        filterable: false,
      },
    ];

    return (
      <div className="dashboard-grid">
        <div />
        <AppBar
          className={classes.topbar}
        >
          <Toolbar className={classes.toolbar}>
            <Button
              onClick={() => {
                this.refreshList(this.props);
              }}
              color="secondary"
              style={{
                textTransform: "none",
                color: "white",
              }}
            >
              <Refresh />
              {" "}
              Refresh list
            </Button>
            <TextField
              id="fullName"
              type="text"
              className={classes.TextField}
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
        <div />
        <main className={`${classes.rtWrapper} flexCenter`}>
          <StyledTable>
            <ReactTable
              ref={this.reactTable}
              className={`${classes.table} -highlight`}
              data={people}
              columns={columns}
            />
          </StyledTable>
        </main>
      </div>
    );
  }
}

const componentWithStyles = withStyles(styles)(Dashboard);

function mapStateToProps(state) {
  const { userList } = state;
  return {
    people: userList,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setUserList: bindActionCreators(grabUserList, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(componentWithStyles);
