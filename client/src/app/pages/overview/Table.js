import React from "react";
import IPropTypes from "react-immutable-proptypes";

import {Row} from "app/model/test";
import {Table as TableComponent} from "components";

const createColumn = () => ([{
    key: "1",
    dataField: "id",
    isKey: true,
    columnName: "ID",
}, {
    key: "2",
    dataField: "name",
    columnName: "Name",
}]);

const Table = ({rows}) => (
    <TableComponent
        columns={createColumn()}
        data={rows}
    />
);

Table.propTypes = {
    rows: IPropTypes.listOf(Row).isRequired,
};

export default Table;
