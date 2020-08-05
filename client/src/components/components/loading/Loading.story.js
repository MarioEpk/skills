import React from "react";

import {boolean, lorem} from "components/story";

import Loading from "./Loading";

const children = <div>{lorem.generateParagraphs(5)}</div>;

export default [Loading, () => ({
    children,
    loading: boolean("Loading", false),
})];
