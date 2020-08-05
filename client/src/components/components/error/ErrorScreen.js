import React from 'react';
import PropTypes from 'prop-types';

import {Flex} from "../../layouts/flex";

const ErrorScreen = ({error}) => (
    <Flex>
        {error}
    </Flex>
);

ErrorScreen.propTypes = {
    error: PropTypes.string.isRequired,
};

export default ErrorScreen;
