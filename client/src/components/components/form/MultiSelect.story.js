import {action, text, boolean} from "components/story";
import {fromJS} from "immutable";

import MultiSelect from "./MultiSelect";

export default [MultiSelect, () => ({
    placeholder: text("Label", "label"),
    disabled: boolean("Disabled", false),
    options: fromJS([{label: "test", value: 1}, {label: "test2", value: 2}]),
    input: {
        onChange: action("action"),
        value: fromJS([1]),
        onBlur: action("onBlur"),
    },
})];
