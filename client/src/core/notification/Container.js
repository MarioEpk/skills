import {useEffect} from "react";
import {connect} from "react-redux";

import i18n from "core/i18n";
import {fn} from "core/util";

import {hide} from "./actions";
import {getShow, getTitle, getText, getType} from "./selectors";

// Replace this component with real notification component
const NotificationPlaceholder = ({show, title, text, type}) => {
    useEffect(() => {
        if (show) {
            // eslint-disable-next-line no-console
            console.log("Notification: ", show, type, title, text);
        }
    }, [show, title, text, type]);
    return null;
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
    title: t(title),
    text: t(text),
    type,
});

export default fn.compose(
    i18n.withTranslation(),
    connect(mapStateToProps, mapDispatchToProps, mergeProps),
)(NotificationPlaceholder);
