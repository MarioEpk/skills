import {NAME} from "./constants";
import useAccess from "./useAccess";
import {hasAccess} from "./util";

export {accesses} from "./constants";

export {default as Access} from "./Access";

const notification = {
    NAME,
    useAccess,
    hasAccess,
};

export default notification;
