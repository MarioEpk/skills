import {action, boolean} from "components/story";

import Modal from "./Modal";

const children = ("Test");

export default [Modal, () => ({
    children,
    open: boolean("Open", true),
    onClose: action("onClose"),
})];
