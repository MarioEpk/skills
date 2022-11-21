import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import IPropTypes from "react-immutable-proptypes";

import {MultiSelect} from "components";
import types from "core/types";
import {convertTypeToOptions} from "core/form";
import {Type, Project} from "app/model/type";
import {Cv} from "app/model/cv";

const AdvancedSearch = ({
    filteredData,
    setFilteredData,
    projectTypes,
    positions,
    technologyTypes,
    skillTypes,
    languageTypes,
}) => (
    console.log(positions.toJS()),
    <>
        <MultiSelect
            id="position-filter"
            options={convertTypeToOptions(positions)}
            input={{
                onChange: (value) => console.log(value),
                value:[]
            }}

        />
    </>
);

AdvancedSearch.propTypes = {
    filteredData: IPropTypes.listOf(Cv).isRequired,
    setFilteredData: PropTypes.func.isRequired,
    projectTypes: IPropTypes.listOf(PropTypes.instanceOf(Project)).isRequired,
    positions: IPropTypes.listOf(PropTypes.instanceOf(Type)).isRequired,
    technologyTypes: IPropTypes.listOf(PropTypes.instanceOf(Type)).isRequired,
    skillTypes: IPropTypes.listOf(PropTypes.instanceOf(Type)).isRequired,
    languageTypes: IPropTypes.listOf(PropTypes.instanceOf(Type)).isRequired,
};

const mapStateToProps = (state) => ({
    projectTypes: types.getType(state, types.availableTypes.PROJECT),
    technologyTypes: types.getType(state, types.availableTypes.TECHNOLOGY),
    skillTypes: types.getType(state, types.availableTypes.SKILL),
    languageTypes: types.getType(state, types.availableTypes.LANGUAGE),
    positions: types.getType(state, types.availableTypes.POSITION),
});

export default connect(mapStateToProps)(AdvancedSearch);
