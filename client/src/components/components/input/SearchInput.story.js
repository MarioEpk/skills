import {action} from "components/story";

import SearchInput from "./SearchInput";

export default [SearchInput, () => ({
    onChange: action("on change"),
    name: "storybook input",
    label: "storybook label",
    value: "controlled input",
})];
