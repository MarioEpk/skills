import React from "react";
import PropTypes from "prop-types";

import i18n from "core/i18n";

import {Modal} from "../modal";
import {Button} from "../button";

import css from "./Confirmation.module.scss";

const Confirmation = ({
    title,
    text,
    onDelete,
    onClose,
    open,
}) => {
    const {t} = i18n.useTranslation();

    return (
        <Modal
            open={open}
            onClose={onClose}
        >
            <div className={css.main}>
                <h1>{title}</h1>
                {text && <p>{text}</p>}
                <span className={css.buttons}>
                    <Button
                        type={Button.type.COLORED}
                        label={t("confirm.button.label")}
                        onClick={(...params) => {
                            onDelete(...params);
                            onClose();
                        }}
                    />
                    <Button
                        label={t("close.button.label")}
                        onClick={onClose}
                    />
                </span>
            </div>
        </Modal>
    );
};

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
