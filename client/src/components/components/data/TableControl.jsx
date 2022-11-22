import React, {useEffect, useMemo, useState} from "react";
import PropTypes from "prop-types";
import {AddRounded} from "@material-ui/icons";

import i18n from "core/i18n";

import {useDebouncedCallback} from "use-debounce";
import SearchInput from "./SearchInput";
import {columnsPropTypes, ColumnsVisibility} from "../table";
import {Button} from "../button";
import css from "./Data.module.scss";
import {Flex} from "../../layouts/flex";

const TableControl = ({
    title,
    filters,
    setFiltersToUrl,
    quickSearchPlaceholder,
    onCreate,
    columns,
    columnHiddenDataFields,
    advancedSearchComponent: AdvancedSearchComponent,
    setColumnHiddenDataFields,
}) => {
    const {t} = i18n.useTranslation();
    const areAdvancedFiltersApplied = useMemo(() => (
        filters ? Object.keys(filters).some((filterKey) => filterKey !== 'quickSearch') : false
    ), [filters]);
    const [quickSearchValue, setQuickSearchValue] = useState(filters.quickSearch ?? "");
    const [advancedFiltersVisible, setAdvancedFiltersVisible] = useState(areAdvancedFiltersApplied);

    const areFiltersApplied = useMemo(() => (
        filters ? Object.keys(filters).length > 0 : false
    ), [filters]);

    const debouncedQuickSearch = useDebouncedCallback((debouncedValue) => {
        setFiltersToUrl({quickSearch: debouncedValue});
    }, 500);

    useEffect(() => {
        debouncedQuickSearch(quickSearchValue);
    }, [quickSearchValue]);

    const resetFilters = () => {
        setFiltersToUrl({}, false);
        setQuickSearchValue("");
    };

    return (
        <>
            <div className={css.controlWrapper}>
                <div className={css.control}>
                    <h2 className={css.title}>{title}</h2>
                    <span className={css.search}>
                        <SearchInput
                            placeholder={quickSearchPlaceholder}
                            value={quickSearchValue}
                            onChange={setQuickSearchValue}
                            name={`${title}-search`}
                        />
                    </span>
                    {onCreate && (
                        <Flex gap="0.5rem">
                            {areFiltersApplied && !advancedFiltersVisible && (
                                <Button
                                    onClick={resetFilters}
                                    label={t(`resetFilters.button.label`)}
                                    type={Button.type.DANGER}
                                />
                            )}
                            {AdvancedSearchComponent && (
                                <Button
                                    onClick={() => setAdvancedFiltersVisible(!advancedFiltersVisible)}
                                    label={advancedFiltersVisible ? t(`advancedSearchHide.button.label`) : t(
                                        `advancedSearchShow.button.label`,
                                    )}
                                    type={Button.type.DARK}
                                />
                            )}
                            <ColumnsVisibility
                                columns={columns}
                                columnHiddenDataFields={columnHiddenDataFields}
                                setColumnHiddenDataFields={setColumnHiddenDataFields}
                            />
                            <Button
                                onClick={onCreate}
                                label={t(`add.button.label`)}
                                startIcon={<AddRounded />}
                                type={Button.type.COLORED}
                            />
                        </Flex>
                    )}
                </div>
                {AdvancedSearchComponent && advancedFiltersVisible && (
                    <div className={css.advancedSearch}>
                        <div className={css.advancedSearchContent}>
                            <AdvancedSearchComponent />
                        </div>
                    </div>
                )}
            </div>
            {areFiltersApplied && (
                <div className={css.activeFilters}>
                    {t("activeFilters")}
                </div>
            )}
        </>
    );
};

TableControl.propTypes = {
    title: PropTypes.string.isRequired,
    columns: columnsPropTypes.isRequired,
    setFiltersToUrl: PropTypes.func.isRequired,
    columnHiddenDataFields: PropTypes.array.isRequired,
    setColumnHiddenDataFields: PropTypes.func.isRequired,
    onCreate: PropTypes.func,
    filters: PropTypes.object,
    quickSearchPlaceholder: PropTypes.string,
    // connected component
    advancedSearchComponent: PropTypes.object,
};

TableControl.defaultProps = {
    onCreate: undefined,
    quickSearchPlaceholder: "",
    advancedSearchComponent: undefined,
    filters: {},
};

export default TableControl;
