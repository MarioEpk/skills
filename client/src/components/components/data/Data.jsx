import React, {useEffect, useState} from "react";
import {List} from "immutable";
import ImmutablePropTypes from "react-immutable-proptypes";
import PropTypes from "prop-types";
import {AddRounded} from "@material-ui/icons";
import removeAccents from "remove-accents";
import useLocalStorage from "use-local-storage";

import i18n from "core/i18n";
import {fn} from "core/util";
import SearchInput from "./SearchInput";
import {Block} from "../block";
import {Table, columnsPropTypes, ColumnsVisibility} from "../table";
import {Button} from "../button";
import {Loading} from "../loading";
import {Confirmation} from "../confirmation";

import css from "./Data.module.scss";
import {Flex} from "../../layouts/flex";

const Data = ({
    tableId,
    title,
    columns,
    data,
    loading,
    quickSearchByDataFields,
    onEdit,
    onDelete,
    onCreate,
    onCustomAction,
    searchPlaceholder,
    onRowClick,
    onUnshare,
    advancedSearch: AdvancedSearch,
}) => {
    const [columnHiddenIds, setColumnHiddenKeys] = useLocalStorage(`${tableId}-columnHiddenKeys`,
        columns.reduce((acc, column) => (column.defaultHidden ? [column.key, ...acc] : acc), []));
    const [filteredData, setFilteredData] = useState(data);
    const [searchValue, setSearchValue] = useState("");
    const [deleteConfirmation, setDeleteConfirmation] = useState(undefined);
    const {t} = i18n.useTranslation();

    const tableActions = {
        columnName: "Actions",
        onEdit,
        onDelete: onDelete ? (row) => setDeleteConfirmation(row) : undefined,
        custom: onCustomAction,
        onUnshare,
        align: 'right',
        collapsed: true,
    };

    useEffect(() => {
        if (quickSearchByDataFields && !fn.isEmpty(searchValue)) {
            const result = data.filter((row) => (
                quickSearchByDataFields.some((searchField) => (
                    removeAccents(row.getIn(searchField.split('.'), "").toLowerCase()).includes(removeAccents(searchValue.toLowerCase()))
                ))
            ));
            setFilteredData(result);
        } else {
            setFilteredData(data);
        }
    }, [searchValue, data]);

    const onSearch = (e) => {
        const {value} = e.target;
        setSearchValue(value);
    };

    return (
        <>
            {AdvancedSearch && (
                <Block className={css.advancedSearch}>
                    <h2 className={css.title}>{t("advancedSearch.title")}</h2>
                    <AdvancedSearch filteredData={filteredData} setFilteredData={setFilteredData} />
                </Block>
            )}
            <Block>
                <Loading loading={loading}>
                    <Confirmation
                        title={t(`delete.button.label`)}
                        text={t(`confirmation.text`)}
                        onDelete={() => onDelete(deleteConfirmation)}
                        onClose={() => setDeleteConfirmation(undefined)}
                        open={!!deleteConfirmation}
                    />
                    <div className={css.control}>
                        <h2 className={css.title}>{title}</h2>
                        {!!quickSearchByDataFields
                            && (
                                <span className={css.search}>
                                    <SearchInput
                                        placeholder={searchPlaceholder}
                                        label={t(`search.label`)}
                                        value={searchValue}
                                        onChange={onSearch}
                                        name={`${title}-search`}
                                    />
                                </span>
                            )}
                        {onCreate && (
                            <Flex gap="0.5rem">
                                {AdvancedSearch && (
                                    <Button
                                        onClick={onCreate}
                                        label={t(`advancedSearch.button.label`)}
                                        type={Button.type.DARK}
                                    />
                                )}
                                <ColumnsVisibility
                                    columns={columns}
                                    columnHiddenKeys={columnHiddenIds}
                                    setColumnHiddenKeys={setColumnHiddenKeys}
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
                    {filteredData.size > 0 && (
                        <div className={css.table}>
                            <Table
                                columns={columns}
                                data={filteredData}
                                actions={tableActions}
                                onRowClick={onRowClick}
                                columnHiddenIds={columnHiddenIds}
                            />
                        </div>
                    )}
                </Loading>
            </Block>
        </>
    );
};

Data.propTypes = {
    tableId: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    columns: columnsPropTypes.isRequired,
    data: ImmutablePropTypes.list,
    loading: PropTypes.bool,
    quickSearchByDataFields: PropTypes.arrayOf(PropTypes.string),
    onEdit: PropTypes.func,
    onDelete: PropTypes.func,
    onCreate: PropTypes.func,
    onCustomAction: PropTypes.func,
    searchPlaceholder: PropTypes.string,
    onRowClick: PropTypes.func,
    onUnshare: PropTypes.func,
    // connected component
    advancedSearch: PropTypes.object,
};

Data.defaultProps = {
    data: List(),
    loading: false,
    quickSearchByDataFields: undefined,
    onEdit: undefined,
    onDelete: undefined,
    onCreate: undefined,
    onCustomAction: undefined,
    searchPlaceholder: "",
    onRowClick: undefined,
    onUnshare: undefined,
    advancedSearch: undefined,
};

export default Data;
