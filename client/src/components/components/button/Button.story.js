import {action, text, optionsKnob} from "components/story";

import Button from "./Button";

const optionsObj = {
    display: 'inline-radio',
};

export default [Button, () => ({
    onClick: action("onClick"),
    label: text("Button label", "Press me!"),
    type: optionsKnob("Type", Object.values(Button.type), Button.type.DARK, optionsObj),
})];
