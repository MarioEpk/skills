import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {Button} from "components";

import getStaticUrl from "./getStaticUrl";
import {navigate} from "./actions";

const Link = ({route, params, query, to, className, children, onClick, type}) => {
    const passedProps = {
        className,
        children,
        type,
        // Add other needed props
    };

    const url = to || (route ? getStaticUrl(route, params, query) : "");
    if (process.env.NODE_ENV === "development" && !url) {
        // eslint-disable-next-line no-console
        console.warn("no url for Link!", {route, params, query, to});
    }
    return (
        // eslint-disable-next-line jsx-a11y/anchor-has-content
        <Button
            {...passedProps}
            href={url}
            onClick={(e) => {
                if (e.stopPropagation) {
                    e.stopPropagation();
                }
                if (e.preventDefault) {
                    e.preventDefault();
                }
                onClick(route, params, query);
                return false;
            }}
        />
    );
};

Link.propTypes = {
    route: PropTypes.string,
    params: PropTypes.object,
    currentParams: PropTypes.object,
    query: PropTypes.object,
    to: PropTypes.string,
    className: PropTypes.string,
    children: PropTypes.node.isRequired,
    onClick: PropTypes.func.isRequired,
    type: PropTypes.oneOf(Object.values(Button.type)),
};

Link.defaultProps = {
    route: null,
    params: {},
    currentParams: {},
    query: {},
    to: null,
    className: "",
    type: Button.type.LIGHT,
};

const mapDispatchToProps = (dispatch) => ({
    onClick: (route, params, query) => dispatch(navigate(route, params, query)),
});

export default connect(undefined, mapDispatchToProps)(Link);
