import React from "react";
import PropTypes from "prop-types";
import ModalUI from '@material-ui/core/Modal';

import css from "./Modal.module.scss";

const Modal = ({open, onClose, children}) => (
    <ModalUI
        open={open}
        onClose={onClose}
        aria-labelledby="modal"
        aria-describedby="modal-description"
    >
        <div className={css.main}>{children}</div>
    </ModalUI>
);

Modal.propTypes = {
    children: PropTypes.node.isRequired,
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default Modal;
