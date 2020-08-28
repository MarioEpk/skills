import React, {useEffect, useRef} from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";

import i18n from "core/i18n";
import {fn} from "core/util";
import {NotificationLayout, Notification} from "components";

import {hide} from "./actions";
import {getShow, getTitle, getText, getType} from "./selectors";
import {HIDE_TIME} from "./constants";

const Container = ({show, title, text, type, onClose}) => {
    let timer = useRef();
    useEffect(() => {
        clearTimeout(timer);
        if (show) {
            timer = setTimeout(() => {
                onClose();
            }, HIDE_TIME);
        }
        return () => clearTimeout(timer);
    });
    return <NotificationLayout>{show && <Notification type={type} title={title} text={text} />}</NotificationLayout>;
};

Container.propTypes = {
    show: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    text: PropTypes.string,
    type: PropTypes.oneOf(Object.values(Notification.types)),
    onClose: PropTypes.func.isRequired,
};

Container.defaultProps = {
    text: null,
    type: Notification.types.INFO,
};

const mapStateToProps = (state) => ({
    show: getShow(state),
    title: getTitle(state),
    text: getText(state),
    type: getType(state),
});

const mapDispatchToProps = (dispatch) => ({
    onClose: () => dispatch(hide()),
});

const mergeProps = ({show, title, text, type}, {onClose}, {t}) => ({
    show,
    onClose,
    title,
    text: t(text),
    type,
});

export default fn.compose(
    i18n.withTranslation(),
    connect(mapStateToProps, mapDispatchToProps, mergeProps),
)(Container);
