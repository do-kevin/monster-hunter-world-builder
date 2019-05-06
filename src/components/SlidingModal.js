import React from "react";
import { Modal, Slide } from "@material-ui/core";
import PropTypes from "prop-types";

function SlidingModal(props) {
  const { children, isOpen, onClose } = props;
  return (
    <Modal
      className="flexCenter"
      open={isOpen}
      onClose={onClose}
    >
      <Slide
        direction="up"
        in={isOpen}
        mountOnEnter
        unmountOnExit
      >
        {children}
      </Slide>
    </Modal>
  );
}

SlidingModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default SlidingModal;
