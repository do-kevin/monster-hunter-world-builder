import React from "react";
import {
  Typography, withStyles, Card, CardMedia, Avatar, CardContent,
} from "@material-ui/core";
import { slidingModalStyles } from "Styles";
import { SlidingModal } from "components/modals";

function ProfileModal(props) {
  const {
    classes, modalData, openModal, onClose, onClickClose, myLoadoutsData = {},
  } = props;
  const name = modalData[0];
  const otherProfileInfo = modalData[1];
  const { birth_date, phone_number } = otherProfileInfo;

  console.log(myLoadoutsData);

  return (
    <SlidingModal
      isModalOpen={openModal}
      onClose={onClose}
      classesProp={{ root: classes.content }}
    >
      <Card className={classes.card}>
        <CardMedia
          className={classes.media}
          src={`https://randomuser.me/api/portraits/men/${Math.floor(Math.random() * 100)}.jpg`}
        >
          <Avatar
            className={classes.innerAvatar}
            src={`https://randomuser.me/api/portraits/men/${Math.floor(Math.random() * 100)}.jpg`}
            alt="avatar placeholder"
          />
        </CardMedia>
        <CardContent>
          <Typography variant="h5">{name}</Typography>
          <Typography variant="subtitle1">
            {birth_date}
          </Typography>
          <Typography variant="subtitle2">
            {phone_number}
          </Typography>
          <button onClick={onClickClose} type="button">Close</button>
        </CardContent>
      </Card>
    </SlidingModal>
  );
}

export default withStyles(slidingModalStyles)(ProfileModal);
