import {typeApi} from "app/serverApi";
import {availableTypes} from "./constants";

export const getApiForType = (type) => {
    switch (type) {
        case availableTypes.LANGUAGE: {
            return {
                fetch: typeApi.fetchLanguageTypes,
                remove: typeApi.deleteLanguageType,
                update: typeApi.updateLanguageType,
                create: typeApi.createLanguageType,
            };
        }
        case availableTypes.SKILL: {
            return {
                fetch: typeApi.fetchSkillTypes,
                remove: typeApi.deleteSkillType,
                update: typeApi.updateSkillType,
                create: typeApi.createSkillType,
            };
        }
        case availableTypes.TECHNOLOGY: {
            return {
                fetch: typeApi.fetchTechnologyTypes,
                remove: typeApi.deleteTechnologyType,
                update: typeApi.updateTechnologyType,
                create: typeApi.createTechnologyType,
            };
        }
        case availableTypes.PROJECT: {
            return {
                fetch: typeApi.fetchProjectTypes,
                remove: typeApi.deleteProjectType,
                update: typeApi.updateProjectType,
                create: typeApi.createProjectType,
            };
        }
        case availableTypes.POSITION: {
            return {
                fetch: typeApi.fetchPositionTypes,
                remove: typeApi.deletePositionType,
                update: typeApi.updatePositionType,
                create: typeApi.createPositionType,
            };
        }
        default: {
            throw new Error(`Type - ${type} was not found`);
        }
    }
};
