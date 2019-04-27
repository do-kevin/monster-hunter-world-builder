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
import matchSorter from "match-sorter";
import { listAllProfiles } from "services/ProfileApi";
import { grabUserList, clearUserList } from "redux/state/list/Actions";

const textColor = "hsl(0, 0%, 77%)";
const avatarFlex = "16.5 !important";
const avatarPadding = "9px 8px";

const StyledTable = styled.main`
  .rt-tbody {
    text-align: center;
  }
  .rt-resizable-header-content {
    color: hsl(0, 0%, 100%);
    font-size: 18px;
  }
  .rt-tr-group {
    .rt-tr {
      .rt-td:first-child {
        padding: ${avatarPadding}
        flex: ${avatarFlex}
      }
      .rt-td:nth-child(2) {
        padding: 16px;
      }
      .rt-td {
        color: ${textColor};
      }
    }
  }
  .rt-thead {
    .rt-tr {
      .rt-th:first-child {
        padding: ${avatarPadding}
        flex: ${avatarFlex}
      }
      .rt-th:not(first-child) {
        text-align: center;
        div:first-child {
          padding: 3px 0 3px 13px;
        }
      }
    }
  }
  .rt-td {
    border-bottom: 1px solid hsl(206, 12%, 15%);
  }
`;

const styles = () => ({
  topbar: {
    gridArea: "Topbar",
    height: "70px",
    background: "hsl(205, 11%, 31%)",
    width: "100%",
    position: "absolute",
  },
  toolbar: {
    paddingLeft: "120px",
    display: "flex",
    flexDirection: "row-reverse",
  },
  rtWrapper: {
    gridArea: "List",
    width: "calc(97.5vw - 110px)",
    padding: "18px 18px 18px 17px",
  },
  table: {
    width: "100%",
    background: "hsl(206, 12%, 17%)",
    color: textColor,
    height: "calc(95vh - 70px)",
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
    color: "hsl(0, 100%, 100%)",
    fontWeight: 600,
    marginRight: "10px",
  },
  cellStyles: {
    fontWeight: 600,
    padding: "14px",
    color: textColor,
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
                  color: textColor,
                  padding: "6px 10px 6px 10px",
                }}
              >
                {props.value}
              </Button>
              <Modal
                className="flexCenter"
                open={
                  this.state[`modal${userId}`] === undefined ? false : this.state[`modal${userId}`]
                }
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
        filterMethod: (filter, row) => matchSorter([row[filter.id]], filter.value).length !== 0,
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
        <div
          style={{
            border: "2px dashed white",
            gridArea: "nav",
          }}
        />
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
