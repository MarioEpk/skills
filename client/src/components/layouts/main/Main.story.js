import React from "react";
import {boolean, coloredPlaceholder} from "components/story";

import Main from "./Main";

const children = (
    <>
        {coloredPlaceholder("blue")}
        {coloredPlaceholder("red")}
    </>
);

export default [Main, () => ({
    children,
    vertical: boolean("Vertical", false),
})];
