import React from "react";
import {boolean, coloredPlaceholder} from "components/story";

import TwoColumns from "./TwoColumns";

const children = (
    <>
        {coloredPlaceholder("blue")}
        {coloredPlaceholder("red")}
    </>
);

export default [TwoColumns, () => ({
    children,
    vertical: boolean("Vertical", false),
})];
