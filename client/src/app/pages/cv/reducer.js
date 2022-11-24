import {combineReducers} from "redux-immutable";

import language from "./language";
import skill from "./skill";
import technology from "./technology";
import certificate from "./certificate";
import other from "./other";
import project from "./project";
import education from "./education";

export default combineReducers({
    [language.NAME]: language.reducer,
    [skill.NAME]: skill.reducer,
    [technology.NAME]: technology.reducer,
    [certificate.NAME]: certificate.reducer,
    [other.NAME]: other.reducer,
    [project.NAME]: project.reducer,
    [education.NAME]: education.reducer,
});
