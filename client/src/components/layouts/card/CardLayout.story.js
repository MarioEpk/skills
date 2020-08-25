import React from "react";
import {boolean, coloredPlaceholder} from "components/story";

import CardLayout from "./Flex";

const children = (
    <>
        {coloredPlaceholder("blue")}
        {coloredPlaceholder("red")}
    </>
);

export default [CardLayout, () => ({
    children,
    vertical: boolean("Vertical", false),
})];
