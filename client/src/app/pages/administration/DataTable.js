import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import IPropTypes from "react-immutable-proptypes";

import {Type} from "app/model/type";
import {Data} from "components";
import {getType} from "./selectors";
import {availableTypesArray} from "./constants";

const columns = [{
    key: "1",
    dataField: "id",
    isKey: true,
    columnName: "ID",
}, {
    key: "2",
    dataField: "name",
    columnName: "Name",
}];

const DataTable = ({rows, title, loading}) => (
    <Data
        title={title}
        columns={columns}
        data={rows}
        loading={loading}
    />
);

DataTable.propTypes = {
    rows: IPropTypes.listOf(Type).isRequired,
    // Prop for mapStateToProps function
    // eslint-disable-next-line react/no-unused-prop-types
    typeName: PropTypes.oneOf(availableTypesArray).isRequired,
    title: PropTypes.string.isRequired,
    loading: PropTypes.bool,
};

DataTable.defaultProps = {
    loading: false,
};

const mapStateToProps = (state, {typeName}) => ({
    rows: getType(state, typeName),
});

export default connect(mapStateToProps)(DataTable);
