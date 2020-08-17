import fetch from "core/fetch";
import {Type} from "app/model/type";

const fetchLanguageType = () => fetch.doGet("/type/language", null, Type.fromServerList);

export default {
    fetchLanguageType,
};
