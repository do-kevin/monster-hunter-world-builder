import React from "react";
import {
  Typography, withStyles, Modal, Slide, Card, CardMedia, Avatar, CardContent,
} from "@material-ui/core";
import { bigStyles } from "screens/DashboardStyles";

function ModalCard(props) {
  const {
    classes, modalData, openModal, onClose,
  } = props;
  const { birth_date, phone_number } = modalData[1];

  return (
    <div>
      <Modal
        className="flexCenter"
        open={openModal}
        onClose={onClose}
      >
        <Slide
          direction="up"
          in={openModal}
          mountOnEnter
          unmountOnExit
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
              <Typography variant="h5">{modalData[0]}</Typography>
              <Typography variant="subtitle1">
                {birth_date}
              </Typography>
              <Typography variant="subtitle2">
                {phone_number}
              </Typography>
            </CardContent>
          </Card>
        </Slide>
      </Modal>
    </div>
  );
}

export default withStyles(bigStyles)(ModalCard);
