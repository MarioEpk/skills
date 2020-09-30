import React from "react";
import {AddRounded} from "@material-ui/icons";

import {action, text, optionsKnob} from "components/story";

import IconButton from "./IconButton";

const optionsObj = {
    display: 'inline-radio',
};

export default [IconButton, () => ({
    onClick: action("onClick"),
    ariaLabel: text("Button aria label", "Press me!"),
    icon: <AddRounded />,
    type: optionsKnob("Type", Object.values(IconButton.type), IconButton.type.DARK, optionsObj),
})];
