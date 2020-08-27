import {doPost} from "./fetch";

const processUser = (googleId, email) => doPost("/user/process", {googleId, email});

export default {
    processUser,
};
