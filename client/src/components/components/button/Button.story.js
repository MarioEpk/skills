import {action, text} from "components/story";

import Button from "./Button";

export default [Button, () => ({
    onClick: action("onClick"),
    label: text("Button label", "Press me!"),
})];
