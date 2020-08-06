/* eslint-disable react/jsx-one-expression-per-line */
import React from "react";
import {Helmet} from "react-helmet";
import PropTypes from "prop-types";

const PageTitle = ({title}) => (
    <Helmet>
        <title>
            MoroŽivotopis - {title}
        </title>
    </Helmet>
);

PageTitle.propTypes = {
    title: PropTypes.string.isRequired,
};

export default PageTitle;
