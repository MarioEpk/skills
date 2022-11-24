import {isArray} from "core/util";

export const convertToNumberArray = (value) => {
    if (!isArray(value)) {
        return [Number(value)];
    }

    return value.map((item) => Number(item));
};
