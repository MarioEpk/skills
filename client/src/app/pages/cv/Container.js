import React from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import IPropTypes from "react-immutable-proptypes";

import {PageTitle} from "app/containers";
import {WithColumn, Menu} from "components";
import {compose} from "core/form";
import language, {Language} from "./language";
import {Form} from "./form";
import {createMenuItems} from "./utils";
import {getTypes} from "./selectors";

const Container = ({types, addLanguageToCv}) => (
    <>
        <PageTitle title="Můj životopis" />
        <WithColumn
            title="Můj životopis"
            column={[
                <Menu key="menu1" title="Projekty" items={createMenuItems(types.projects)} />,
                <Menu key="menu2" title="Skilly" items={createMenuItems(types.skills)} />,
                <Menu key="menu3" title="Jazyky" items={createMenuItems(types.languages, addLanguageToCv)} />,
                <Menu key="menu4" title="Technologie" items={createMenuItems(types.technologies)} />,
                <Menu key="menu5" title="Certifikáty" onClick={() => console.log("Certifikáty")} />,
                <Menu key="menu6" title="Ostatní" onClick={() => console.log("Ostatní")} />,
            ]}
        >
            <Form />
            <Language />
        </WithColumn>
    </>
);

const mapStateToProps = (state) => ({
    types: getTypes(state),
});

const mapDispatchToProps = ({
    addLanguageToCv: language.addLanguageToCv,
});

Container.propTypes = {
    // TODO :: Model propType
    types: IPropTypes.record.isRequired,
    addLanguageToCv: PropTypes.func.isRequired,
};

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
)(Container);
