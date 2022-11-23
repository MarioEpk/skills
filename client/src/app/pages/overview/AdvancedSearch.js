import React, {useMemo, useState} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import IPropTypes from "react-immutable-proptypes";
import {useDebouncedCallback} from "use-debounce";

import {Button, MultiSelectComponent} from "components";
import types from "core/types";
import {convertTypeToOptions} from "core/form";
import {Type, Project} from "app/model/type";
import {useOnUpdate} from "core/util";
import {OVERVIEW} from "app/constants";
import i18n from "core/i18n";
import {useFiltersFromUrl, useSetFiltersToUrl} from "core/url";

import {OVERVIEW_TABLE_ID} from "./constants";
import {convertToNumberArray} from "./utils";

const AdvancedSearch = ({
    projectTypes,
    positions,
    technologyTypes,
    skillTypes,
    languageTypes,
}) => {
    const {t} = i18n.useTranslation();
    const setFiltersToUrl = useSetFiltersToUrl(OVERVIEW_TABLE_ID, OVERVIEW);
    const urlFilters = useFiltersFromUrl(OVERVIEW_TABLE_ID);
    const [positionValue, setPositionValue] = useState(urlFilters.positions ?? []);
    const [projectTypeValue, setProjectTypeValue] = useState(urlFilters.projectTypes ?? []);
    const [technologyTypeValue, setTechnologyTypeValue] = useState(urlFilters.technologyTypes ?? []);
    const [skillTypeValue, setSkillTypeValue] = useState(urlFilters.skillTypes ?? []);
    const [languageTypeValue, setLanguageTypeValue] = useState(urlFilters.languageTypes ?? []);

    const setFiltersDebounced = useDebouncedCallback((filters) => {
        setFiltersToUrl(filters);
    }, 500);

    useOnUpdate(() => {
        setFiltersDebounced({
            positions: positionValue,
            technologyTypes: technologyTypeValue,
            projectTypes: projectTypeValue,
            skillTypes: skillTypeValue,
            languageTypes: languageTypeValue,
        });
    }, [positionValue, projectTypeValue, technologyTypeValue, skillTypeValue, languageTypeValue]);

    const resetFilters = () => {
        setPositionValue([]);
        setProjectTypeValue([]);
        setTechnologyTypeValue([]);
        setSkillTypeValue([]);
        setLanguageTypeValue([]);
        setFiltersToUrl({}, true);
    };

    const areAdvancedFiltersApplied = useMemo(() => (
        urlFilters ? Object.keys(urlFilters).some((filterKey) => filterKey !== 'quickSearch') : false
    ), [urlFilters]);

    return (
        <>
            <MultiSelectComponent
                id="project-filter"
                label={t("filter.projectType.label")}
                options={convertTypeToOptions(projectTypes).toJS()}
                onChange={(value) => setProjectTypeValue(value.toJS())}
                value={convertToNumberArray(projectTypeValue)}
            />
            <MultiSelectComponent
                id="technology-filter"
                label={t("filter.technologyType.label")}
                options={convertTypeToOptions(technologyTypes).toJS()}
                onChange={(value) => setTechnologyTypeValue(value.toJS())}
                value={convertToNumberArray(technologyTypeValue)}
            />
            <MultiSelectComponent
                id="skill-filter"
                label={t("filter.skillType.label")}
                options={convertTypeToOptions(skillTypes).toJS()}
                onChange={(value) => setSkillTypeValue(value.toJS())}
                value={convertToNumberArray(skillTypeValue)}
            />
            <MultiSelectComponent
                id="language-filter"
                label={t("filter.languageType.label")}
                options={convertTypeToOptions(languageTypes).toJS()}
                onChange={(value) => setLanguageTypeValue(value.toJS())}
                value={convertToNumberArray(languageTypeValue)}
            />
            <MultiSelectComponent
                id="position-filter"
                label={t("filter.position.label")}
                options={convertTypeToOptions(positions).toJS()}
                onChange={(value) => setPositionValue(value.toJS())}
                value={convertToNumberArray(positionValue)}
            />
            {areAdvancedFiltersApplied && (
                <Button
                    onClick={resetFilters}
                    label={t(`resetFilters.button.label`)}
                    type={Button.type.DANGER}
                />
            )}
        </>
    );
};

AdvancedSearch.propTypes = {
    projectTypes: IPropTypes.listOf(PropTypes.instanceOf(Project)).isRequired,
    positions: IPropTypes.listOf(PropTypes.instanceOf(Type)).isRequired,
    technologyTypes: IPropTypes.listOf(PropTypes.instanceOf(Type)).isRequired,
    skillTypes: IPropTypes.listOf(PropTypes.instanceOf(Type)).isRequired,
    languageTypes: IPropTypes.listOf(PropTypes.instanceOf(Type)).isRequired,
};

const mapStateToProps = (state) => ({
    projectTypes: types.getType(state, types.availableTypes.PROJECT),
    technologyTypes: types.getType(state, types.availableTypes.TECHNOLOGY),
    skillTypes: types.getType(state, types.availableTypes.SKILL),
    languageTypes: types.getType(state, types.availableTypes.LANGUAGE),
    positions: types.getType(state, types.availableTypes.POSITION),
});

export default connect(mapStateToProps)(AdvancedSearch);
