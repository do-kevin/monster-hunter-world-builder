import React from "react";
import {
  Typography, withStyles, Card, CardMedia, Avatar, CardContent,
} from "@material-ui/core";
import { dashboardStyles } from "Styles";
import { SlidingModal } from "components/modals";

function ProfileModal(props) {
  const {
    classes, modalData, openModal, onClose,
  } = props;
  const { birth_date, phone_number } = modalData[1];

  return (
    <SlidingModal
      isModalOpen={openModal}
      onClose={onClose}
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
          <Typography variant="h5">{modalData[0]}</Typography>
          <Typography variant="subtitle1">
            {birth_date}
          </Typography>
          <Typography variant="subtitle2">
            {phone_number}
          </Typography>
        </CardContent>
      </Card>
    </SlidingModal>
  );
}

export default withStyles(dashboardStyles)(ProfileModal);
