import React from "react";
import PropTypes from "prop-types";

import {Modal} from "../modal";
import {Button} from "../button";

import css from "./Confirmation.module.scss";

const Confirmation = ({
    title,
    text,
    onDelete,
    onClose,
    open,
}) => (
    <Modal
        open={open}
        onClose={onClose}
    >
        <div className={css.main}>
            <h1>{title}</h1>
            {text && <p>{text}</p>}
            <span className={css.buttons}>
                <Button
                    key="close"
                    type={Button.type.DANGER}
                    label="Zavřít"
                    onClick={onClose}
                />
                <Button
                    key="create"
                    label="Potvrdit"
                    onClick={(...params) => {
                        onDelete(...params);
                        onClose();
                    }}
                />
            </span>
        </div>
    </Modal>
);

Confirmation.propTypes = {
    title: PropTypes.string.isRequired,
    onDelete: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    text: PropTypes.string,
    open: PropTypes.bool,
};

Confirmation.defaultProps = {
    text: undefined,
    open: false,
};

export default Confirmation;
