/* eslint-disable react/destructuring-assignment */
import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
  withStyles, AppBar, Toolbar, Modal, Button, Avatar,
  Card, CardContent, CardMedia, Typography,
} from "@material-ui/core";
import { Refresh } from "@material-ui/icons";
import ReactTable from "react-table";
import { listAllProfiles } from "services/ProfileApi";
import { grabUserList, clearUserList } from "redux/state/list/Actions";

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
  backdrop: {
    backgroundColor: "transparent",
  },
  card: {
    width: "300px",
    outline: "none",
  },
  media: {
    height: "200px",
    background: "linear-gradient(to bottom right, hsl(161, 100%, 61%), hsl(219, 61%, 53%), hsl(235, 100%, 50%))",
  },
});

class Dashboard extends Component {
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
      console.log(result);
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
              <Button
                onClick={() => this.openModal(userId)}
                variant="text"
                color="secondary"
                style={{
                  textTransform: "none",
                  fontWeight: 600,
                  color: "hsl(0, 0%, 0%)",
                }}
              >
                {props.value}
              </Button>
              <Modal
                className="flexCenter"
                open={this.state[`modal${userId}`]}
                onClose={() => { this.closeModal(userId); }}
              >
                <Card
                  className={classes.card}
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
              </Modal>
            </div>
          );
        },
      },
      {
        Header: "Birth date",
        accessor: "birth_date",
        Cell: props => (
          <Typography
            variant="body1"
            style={{ paddingTop: "5px" }}
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
            style={{ paddingTop: "5px" }}
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
          </Toolbar>
        </AppBar>
        <div />
        <main className={`${classes.rtWrapper} flexCenter`}>
          <ReactTable
            className={`${classes.table} -striped -highlight`}
            data={people}
            columns={columns}
            filterable
          />
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
