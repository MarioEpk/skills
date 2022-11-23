import React, {useEffect, useRef} from "react";
import Tooltip from "@material-ui/core/Tooltip";

export {default as app} from "./app";
export {default as fn} from "./fn";
export {default as model} from "./model";
export * from "./constants";
export * from "./dates";

export const useOnUpdate = (effect, deps) => {
    const isMounted = useRef(false);
    useEffect(() => {
        let clearEffectFunction;
        if (isMounted.current) {
            clearEffectFunction = effect();
        }
        isMounted.current = true;
        return clearEffectFunction;
    }, deps);
};

export const isNotNullish = (value) => value !== undefined && value !== null;
export const isObject = (value) => isNotNullish(value) && typeof value === "object";
export const isArray = (value) => Array.isArray(value);
export const isString = (value) => typeof value === "string";
export const isNumber = (value) => typeof value === "number";
export const isEmpty = (value) => typeof value === "undefined" || value === null || value === "";

// eslint-disable-next-line no-unused-vars
export const cleanObject = (obj) => Object.fromEntries(Object.entries(obj).filter(([_, item]) => isNotNullish(item) && item !== false && !isEmpty(item)));

export const formatLongText = (text) => {
    if (text && text.length > 20) {
        return <Tooltip title={text}><div>{`${text.substring(0, 20)}...`}</div></Tooltip>;
    }
    return text;
};
