import React from "react";

import {action} from "components/story";

import Menu from "./Menu";

const children = (
    <>
        children
    </>
);

export default [Menu, () => ({
    children,
    title: "Storybook title",
    items: [
        {
            title: "storybook",
            onClick: action("onClick"),
        },
    ],
})];
