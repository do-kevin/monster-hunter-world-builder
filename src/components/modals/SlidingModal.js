import React from "react";
import { Modal, Slide } from "@material-ui/core";
import PropTypes from "prop-types";

function SlidingModal(props) {
  const { children, isModalOpen, onClose } = props;
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
