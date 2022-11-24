import {NAME} from "./constants";
import useAccess from "./useAccess";
import {hasAccess} from "./util";

export {accesses} from "./constants";
export {default as Access} from "./Access";

const access = {
    NAME,
    useAccess,
    hasAccess,
};

export default access;
