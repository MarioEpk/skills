import RequestError from "./RequestError";
import UnauthorizedError from "./UnauthorizedError";
import coreApi from "./coreApi";
import {doDelete, doGet, doGetExternal, doGetPlain, doPost, doPut, PRECOGNITION_FAILED, timeoutPromise,} from "./fetch";

export default {
    PRECOGNITION_FAILED,
    RequestError,
    UnauthorizedError,
    doGet,
    doGetExternal,
    doPost,
    doPut,
    doDelete,
    doGetPlain,
    timeoutPromise,
    coreApi,
};
