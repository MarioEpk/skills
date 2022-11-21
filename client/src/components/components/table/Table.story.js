import React from "react";
import {fromJS} from 'immutable';
import {action} from "components/story";
import {fn} from 'core/util';

import Table from './Table';
import {Button} from "../button";

const data = fromJS([{
    part: "1",
    book: "BOOK ONE",
    name: "A Long-expected Party",
    immersion: {
        test: "immersion test",
    },
}, {
    part: "3",
    book: "BOOK ONE",
    name: "Three Is Company",
}, {
    part: "11",
    book: "BOOK ONE",
    name: "A Knife in the Dark",
}, {
    part: "13",
    book: "BOOK ONE",
    name: "Many Meetings",
}, {
    part: "21",
    book: "BOOK ONE",
    name: "The Great River",
}, {
    part: "4",
    book: "BOOK TWO",
    name: "Treebeard",
}, {
    part: "10",
    book: "BOOK THREE",
    name: "The Black Gate Opens",
}]);

const columns = [{
    isKey: true,
    columnName: 'Name',
    dataField: 'name',
}, {
    dataField: 'book',
    align: 'right',
}, {
    columnName: 'Part',
    dataField: 'part',
    dataFormat: (dataField, row) => (
        <div>{`Part ${dataField} from book ${row.get("book")}`}</div>
    ),
    width: 200,
}, {
    key: "uniqueKey",
    headerElement: <Button label="Header button" onClick={fn.noop} />,
    dataField: 'part',
}, {
    key: "uniqueKey2",
    columnName: 'Hidden',
    dataField: 'part',
    defaultHidden: true,
}, {
    key: "uniqueKey3",
    columnName: 'Immersion',
    dataField: 'immersion.test',
}];

const actions = {
    columnName: "Akce",
    onEdit: action("onEdit"),
    onDelete: action("onDelete"),
};

export default [Table, () => ({
    columns,
    data,
    actions,
})];
