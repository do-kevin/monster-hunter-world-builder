import React from "react";
import { connect } from "react-redux";
import { SlidingModal } from "components/modals";
import { removeLoadout } from "store/ducks/Loadouts";
import {
  withStyles, Card, CardContent, Button,
  Typography,
} from "@material-ui/core";
import { bindActionCreators } from "redux";
import {
  danger1, greyCard, grey5, grey0,
} from "Colors";

const styles = () => ({
  card: {
    backgroundColor: greyCard,
    textAlign: "center",
  },
  lightgreytext: {
    color: grey5,
  },
  promptBtn: {
    color: grey0,
    textTransform: "none",
  },
  get promptNoBtn() {
    return Object.assign({}, this.promptBtn, {
      backgroundColor: danger1,
    });
  },
});

function DeleteLoadoutModal(props) {
  const {
    classes, onClose, openModal, loadoutName,
  } = props;

  return (
    <SlidingModal
      isModalOpen={openModal}
      onClose={onClose}
      classesProp={{ root: classes.content }}
    >
      <Card className={classes.card}>
        <CardContent>
          <Typography
            variant="subtitle1"
            className={classes.lightgreytext}
          >
            Are you sure you want to delete this loadout,&nbsp;
            {loadoutName}
            ?
          </Typography>
          <Typography
            variant="subtitle2"
            className={classes.lightgreytext}
          >
            Remember to save your loadouts after removal.
          </Typography>
          <div style={{ margin: "5px auto 0", width: "max-content" }}>
            <Button
              onClick={async () => {
                await props.removeLoadout(loadoutName);
                onClose();
              }}
              className={classes.promptBtn}
            >
              Yes
            </Button>
            {" "}
            <Button
              className={classes.promptNoBtn}
              variant="contained"
              onClick={onClose}
            >
              No
            </Button>
          </div>
        </CardContent>
      </Card>
    </SlidingModal>
  );
}

const componentWithStyles = withStyles(styles)(DeleteLoadoutModal);

const mapDispatchToProps = dispatch => ({
  removeLoadout: bindActionCreators(removeLoadout, dispatch),
});

export default connect(null, mapDispatchToProps)(componentWithStyles);
