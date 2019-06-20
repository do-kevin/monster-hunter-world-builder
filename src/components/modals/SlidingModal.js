import React from "react";
import { Modal, Slide } from "@material-ui/core";
import PropTypes from "prop-types";

function SlidingModal(props) {
  const {
    children, isModalOpen, onClose, classesProp,
  } = props;
  return (
    <Modal
      className="flexCenter"
      open={isModalOpen}
      onClose={onClose}
      style={{ overflowY: "scroll" }}
    >
      <Slide
        direction="up"
        in={isModalOpen}
        classes={classesProp}
        mountOnEnter
        unmountOnExit
      >
        {children}
      </Slide>
    </Modal>
  );
}

SlidingModal.propTypes = {
  isModalOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default SlidingModal;
