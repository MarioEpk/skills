import {text} from "components/story";

import ErrorScreen from "./ErrorScreen";

export default [ErrorScreen, () => ({
    error: text("Error value", "Error"),
})];
