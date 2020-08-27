import RequestError from "./RequestError";
import coreApi from "./coreApi";
import {
    PRECOGNITION_FAILED,
    doGet,
    doGetPlain,
    doPost,
    doPut,
    doDelete,
    timeoutPromise,
} from "./fetch";

export default {
    PRECOGNITION_FAILED,
    RequestError,
    doGet,
    doPost,
    doPut,
    doDelete,
    doGetPlain,
    timeoutPromise,
    coreApi,
};
