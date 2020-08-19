import {action, text} from "components/story";

import Confirmation from "./Confirmation";

export default [Confirmation, () => ({
    title: text("Title", "Confirmation"),
    text: text("Text", "Are you sure ?"),
    onDelete: action("On delete"),
    openOnRender: true,
})];
