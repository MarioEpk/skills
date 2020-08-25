import React from "react";
import {connect} from "react-redux";
import IPropTypes from "react-immutable-proptypes";

import {PageTitle} from "app/containers";
import {WithColumn, Menu} from "components";
import {compose} from "core/form";
import {Form} from "./form";
import {createMenuItems} from "./utils";
import {getTypes} from "./selectors";

const Container = ({types}) => (
    <>
        <PageTitle title="Můj životopis" />
        <WithColumn
            column={[
                <Menu key="menu1" title="Projekty" items={createMenuItems(types.projects)} />,
                <Menu key="menu2" title="Skilly" items={createMenuItems(types.skills)} />,
                <Menu key="menu3" title="Jazyky" items={createMenuItems(types.languages)} />,
                <Menu key="menu4" title="Technologie" items={createMenuItems(types.technologies)} />,
                <Menu key="menu5" title="Certifikáty" onClick={() => console.log("Certifikáty")} />,
                <Menu key="menu6" title="Ostatní" onClick={() => console.log("Ostatní")} />,
            ]}
        >
            <Form />
        </WithColumn>
    </>
);

const mapStateToProps = (state) => ({
    types: getTypes(state),
});

Container.propTypes = {
    // TODO :: Model propType
    types: IPropTypes.record.isRequired,
};

export default compose(
    connect(mapStateToProps),
)(Container);
