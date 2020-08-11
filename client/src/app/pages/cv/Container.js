import React from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";

import {Button, Block} from "components";
import {compose} from "core/form";
import {PageTitle} from "app/containers";
import {getTestData} from "./selectors";
import {testDataActionGroup} from "./actions";

const Container = ({fetchTestData}) => (
    <>
        <PageTitle title="Overview" />
        <Block>
            <Button onClick={fetchTestData} label="Get test data" />
        </Block>
    </>
);

Container.propTypes = {
    fetchTestData: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    testData: getTestData(state),
});

const mapDispatchToProps = (dispatch) => ({
    fetchTestData: () => dispatch(testDataActionGroup.request()),
});

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
)(Container);
