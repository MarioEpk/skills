import React from "react";

import {boolean, lorem} from "components/story";

import Navigation from "./Navigation";

const children = <div>{lorem.generateParagraphs(5)}</div>;

export default [Navigation, () => ({
    children,
    loading: boolean("Loading", false),
})];
