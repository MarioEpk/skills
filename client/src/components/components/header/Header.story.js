import React from "react";

import {boolean, lorem} from "components/story";

import Header from "./Header";

const children = <div>{lorem.generateParagraphs(5)}</div>;

export default [Header, () => ({
    children,
    loading: boolean("Loading", false),
})];
