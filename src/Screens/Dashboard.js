import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
  withStyles, Card, CardContent, Grid, AppBar, Toolbar,
} from "@material-ui/core";
import { listAllProfiles } from "services/ProfileApi";
import { grabUserList, clearUserList } from "redux/state/list/Actions";

const styles = () => ({
  toolbar: {
    height: "70px",
    background: "grey",
    width: "100%",
  },
  content: {
    width: "97.2vw",
    padding: "20px 20px",
  },
  userCard: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
  },
});

class Dashboard extends Component {
  state = {
    people: [],
  };

  async componentDidMount() {
    const { setUserList } = this.props;
    const response = await listAllProfiles();
    this.setState({
      people: response,
    });
    setUserList(response);
  }

  render() {
    const { classes } = this.props;
    const { people } = this.state;

    return (
      <div className="dashboard-grid">
        <div />
        <AppBar className={classes.toolbar}>
          <Toolbar style={{ paddingLeft: "120px" }}>
            Placeholder
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
            <section
              style={{
                display: "grid",
                gridTemplateColumns: "50px 1fr 1fr 1fr",
                textAlign: "center",
                height: "50px",
                color: "white",
                width: "932px",
              }}
            >
              <div style={{ width: "50px" }} />
              <div style={{ padding: "11px", fontWeight: 600 }}>Name</div>
              <div style={{ padding: "11px", fontWeight: 600 }}>Birth Date</div>
              <div style={{ padding: "11px", fontWeight: 600 }}>Phone Number</div>
            </section>
          </Grid>
          <Grid
            container
            justify="center"
            alignItems="center"
            direction="column"
          >
            {people.map((user) => {
              console.log(user);
              return (
                <Card
                  key={user.id}
                  style={{
                    borderBottom: "1px solid black",
                    borderRadius: "7px",
                    zIndex: 2,
                  }}
                >
                  <CardContent
                    style={{
                      display: "grid",
                      gridTemplateColumns: "50px 1fr 1fr 1fr",
                      width: "900px",
                      textAlign: "center",
                      height: "50px",
                    }}
                  >
                    <div>
                      <img
                        src={`https://randomuser.me/api/portraits/men/${Math.floor(Math.random() * 100)}.jpg`}
                        alt={`${user.first_name} ${user.last_name}`}
                        style={{
                          height: "50px",
                          borderRadius: "50%",
                          border: "1px solid hsl(175, 5%, 75%)",
                        }}
                      />
                    </div>
                    <div>
                      <p style={{ padding: "2px" }}>{user.first_name} {user.last_name}</p>
                    </div>
                    <div>
                      <p style={{ padding: "2px" }}>{user.birth_date}</p>
                    </div>
                    <div>
                      <p style={{ padding: "2px" }}>{user.phone_number}</p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </Grid>
        </main>
      </div>
    );
  }
}

const componentWithStyles = withStyles(styles)(Dashboard);

function mapStateToProps(state) {
  const { profile } = state;
  return {
    userProfile: profile,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setUserList: bindActionCreators(grabUserList, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(componentWithStyles);
