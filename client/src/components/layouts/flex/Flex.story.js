import React from "react";
import {boolean, coloredPlaceholder} from "components/story";

import Flex from "./Flex";

const children = (
    <>
        {coloredPlaceholder("blue")}
        {coloredPlaceholder("red")}
    </>
);

export default [Flex, () => ({
    children,
    vertical: boolean("Vertical", false),
})];
