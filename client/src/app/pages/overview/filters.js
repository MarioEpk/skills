import removeAccents from "remove-accents";

import {convertToNumberArray} from "./utils";

const overviewQuickFilter = (row, filter) => {
    if (filter.quickSearch) {
        const searchValue = removeAccents(filter.quickSearch.toLowerCase());
        const firstName = removeAccents(row.getIn(["user", "firstName"]).toLowerCase());
        const lastName = removeAccents(row.getIn(["user", "lastName"]).toLowerCase());
        return firstName.includes(searchValue) || lastName.includes(searchValue);
    }
    return true;
};

const positionsFilter = (row, filter) => {
    if (filter.positions) {
        const searchValues = convertToNumberArray(filter.positions);
        const positions = row.get("positions");
        return positions ? positions.some((position) => searchValues.includes(position.get("id"))) : false;
    }
    return true;
};

const projectTypesFilter = (row, filter) => {
    if (filter.projectTypes) {
        const searchValues = convertToNumberArray(filter.projectTypes);
        const projects = row.get("projects");
        return projects ? projects.some(({projectType}) => searchValues.includes(projectType.get("id"))) : false;
    }
    return true;
};

const technologyTypesFilter = (row, filter) => {
    if (filter.technologyTypes) {
        const searchValues = convertToNumberArray(filter.technologyTypes);
        const technologies = row.get("technologies");
        return technologies ? technologies.some(({technologyType}) => searchValues.includes(technologyType.get("id"))) : false;
    }
    return true;
};

const skillTypesFilter = (row, filter) => {
    if (filter.skillTypes) {
        const searchValues = convertToNumberArray(filter.skillTypes);
        const skills = row.get("skills");
        return skills ? skills.some(({skillType}) => searchValues.includes(skillType.get("id"))) : false;
    }
    return true;
};

const languageTypesFilter = (row, filter) => {
    if (filter.languageTypes) {
        const searchValues = convertToNumberArray(filter.languageTypes);
        const languages = row.get("languages");
        return languages ? languages.some(({languageType}) => searchValues.includes(languageType.get("id"))) : false;
    }
    return true;
};

export const overviewFilterFunctions = [
    overviewQuickFilter,
    positionsFilter,
    projectTypesFilter,
    technologyTypesFilter,
    skillTypesFilter,
    languageTypesFilter,
];
