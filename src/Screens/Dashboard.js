import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
  withStyles, Grid, AppBar, Toolbar, IconButton,
} from "@material-ui/core";
import { Refresh } from "@material-ui/icons";
import ReactTable from "react-table";
import { listAllProfiles } from "services/ProfileApi";
import { grabUserList, clearUserList } from "redux/state/list/Actions";

const styles = () => ({
  topbar: {
    height: "70px",
    background: "grey",
    width: "100%",
  },
  toolbar: {
    paddingLeft: "120px",
    display: "flex",
    flexDirection: "row-reverse",
  },
  content: {
    width: "97.2vw",
    padding: "20px 20px",
  },
  tableStyles: {
    width: "90vw",
    left: "56px",
    background: "hsl(0, 0%, 100%)",
    height: "100vh",
    top: "-10px",
    borderRadius: "5px",
  },
  profilePic: {
    height: "50px",
    borderRadius: "50%",
    border: "1px solid hsl(175, 5%, 75%)",
  },
});

class Dashboard extends Component {
  async componentDidMount() {
    this.refreshList(this.props);
  }

  refreshList = async (props) => {
    const { setUserList } = props;
    await clearUserList();
    const response = await listAllProfiles();
    setUserList(response);
  }

  render() {
    const { classes, people } = this.props;

    const columns = [
      {
        Header: "",
        Cell: () => (
          <img
            className={classes.profilePic}
            src={`https://randomuser.me/api/portraits/men/${Math.floor(Math.random() * 100)}.jpg`}
            alt="avatar placeholder"
          />
        ),
        filterable: false,
      },
      {
        Header: "First name",
        accessor: "first_name",
      },
      {
        Header: "Last name",
        accessor: "last_name",
      },
      {
        Header: "Birth date",
        accessor: "birth_date",
      },
      {
        Header: "Phone number",
        accessor: "phone_number",
      },
    ];

    return (
      <div className="dashboard-grid">
        <div />
        <AppBar
          className={classes.topbar}
        >
          <Toolbar className={classes.toolbar}>
            <IconButton
              onClick={() => {
                this.refreshList(this.props);
              }}
            >
              <Refresh />
            </IconButton>
          </Toolbar>
        </AppBar>
        <div />
        <main className={classes.content}>
          <Grid
            container
            justify="center"
            alignItems="center"
            direction="column"
          >
            <ReactTable
              className={classes.tableStyles}
              data={people}
              columns={columns}
              filterable
            />
          </Grid>
        </main>
      </div>
    );
  }
}

const componentWithStyles = withStyles(styles)(Dashboard);

function mapStateToProps(state) {
  const { profile, userList } = state;
  return {
    userProfile: profile,
    people: userList,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setUserList: bindActionCreators(grabUserList, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(componentWithStyles);
