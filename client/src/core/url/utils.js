import {parse} from "querystring";
import {useDispatch} from "react-redux";
import {useCallback, useEffect, useMemo, useState} from "react";

import {isObject, isArray, isString, isNumber, cleanObject} from "core/util";

import {navigate} from "../router/actions";
import {history} from "../router/utils";
import {FILTERS_SEARCH_PARAM_BASE} from "./constants";

export const createFiltersSearchParam = (tableId) => `${FILTERS_SEARCH_PARAM_BASE}_${tableId}`;

const createSearchParamsAsString = (params) => {
    const UrlParams = new URLSearchParams();
    const paramsArray = Object.entries(params);
    paramsArray.forEach(([key, searchParam]) => {
        const searchParamValue = isObject(searchParam) && !isArray(searchParam) ? createSearchParamsAsString(searchParam) : searchParam;
        if (isArray(searchParamValue)) {
            searchParamValue.forEach((value) => {
                if (isString(value)) {
                    UrlParams.append(key, value);
                } else if (isNumber(value)) {
                    UrlParams.append(key, value.toString());
                } else {
                    // eslint-disable-next-line no-console
                    console.warn(`Search param "${key}" has unsupported value: ${value}`);
                }
            });
        } else {
            UrlParams.append(key, searchParamValue);
        }
    });
    const stringUrlParams = UrlParams.toString();
    return stringUrlParams === "" ? undefined : stringUrlParams;
};

const getSearchParams = (search) => {
    const searchParams = new URLSearchParams(search);
    const params = {};
    searchParams.forEach((value, key) => {
        params[key] = value;
    });
    return params;
};

export const useFiltersFromUrl = (tableId) => {
    const [searchParamsAsString, setSearchParamsAsString] = useState(history.location.search);
    useEffect(() => {
        const unlisten = history.listen((location) => {
            setSearchParamsAsString(location.search);
        });

        return () => unlisten();
    }, []);

    return useMemo(() => {
        const searchParams = getSearchParams(searchParamsAsString);
        const tableFilterAsString = searchParams[createFiltersSearchParam(tableId)];
        if (tableFilterAsString) {
            return parse(tableFilterAsString);
        }
        return {};
    }, [searchParamsAsString]);
};

export const useSetFiltersToUrl = (tableId, tableRoute) => {
    const dispatch = useDispatch();
    return useCallback((filters, keepOld = true) => {
        const searchParamsAsString = history.location.search;
        const searchParams = getSearchParams(searchParamsAsString);
        const tableFilterSearchParam = createFiltersSearchParam(tableId);
        const newParams = {
            ...searchParams,
            [tableFilterSearchParam]: createSearchParamsAsString(
                cleanObject(keepOld ? {...parse(searchParams[tableFilterSearchParam]), ...filters} : filters),
            ),
        };
        dispatch(navigate(tableRoute, {}, newParams, true));
    }, [tableId, tableRoute]);
};
