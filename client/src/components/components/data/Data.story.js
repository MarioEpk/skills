import React from "react";
import {fromJS} from "immutable";
import {action, text, boolean} from "components/story";

import Data from "./Data";

const data = fromJS([{
    part: "1",
    book: "BOOK ONE",
    name: "A Long-expected Party",
    width: 400,
    immersion: {
        test: "immersion test",
    },
}, {
    part: "3",
    book: "BOOK ONE",
    name: "Three Is Company",
}]);

const columns = [{
    isKey: true,
    columnName: 'Name',
    dataField: 'name',
}, {
    dataField: 'book',
    align: 'right',
}];

export default [Data, () => ({
    title: text("Title", "Storybook data"),
    columns,
    data,
    loading: boolean("Loading", false),
    searchByDataField: "name",
    onEdit: action("On Edit"),
    onDelete: action("On delete"),
    onCreate: action("On create"),
})];
