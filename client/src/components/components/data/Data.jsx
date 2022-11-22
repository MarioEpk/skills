import React, {useMemo, useState} from "react";
import {List} from "immutable";
import ImmutablePropTypes from "react-immutable-proptypes";
import PropTypes from "prop-types";
import {AddRounded} from "@material-ui/icons";
import useLocalStorage from "use-local-storage";

import i18n from "core/i18n";
import {useFiltersFromUrl} from "core/url";

import SearchInput from "./SearchInput";
import {Block} from "../block";
import {Table, columnsPropTypes, ColumnsVisibility} from "../table";
import {Button} from "../button";
import {Loading} from "../loading";
import {Confirmation} from "../confirmation";
import css from "./Data.module.scss";
import {Flex} from "../../layouts/flex";
import TableControl from "./TableControl";

const Data = ({
    tableId,
    title,
    columns,
    data,
    loading,
    onEdit,
    onDelete,
    onCreate,
    onCustomAction,
    quickSearchPlaceholder,
    onRowClick,
    advancedSearchComponent,
    setFiltersToUrl,
    filterFunctions,
    onUnshare,
}) => {
    const {t} = i18n.useTranslation();
    const [columnHiddenDataFields, setColumnHiddenDataFields] = useLocalStorage(`${tableId}-columnHiddenDataFields`,
        columns.reduce((acc, column) => (column.defaultHidden ? [column.dataField, ...acc] : acc), []));
    const filters = useFiltersFromUrl(tableId);
    const [deleteConfirmation, setDeleteConfirmation] = useState(undefined);

    const tableActions = {
        columnName: "Actions",
        onEdit,
        onDelete: onDelete ? (row) => setDeleteConfirmation(row) : undefined,
        custom: onCustomAction,
        onUnshare,
        align: 'right',
        collapsed: true,
    };

    const filteredData = useMemo(() => (
        data.reduce((acc, row) => {
            if (filterFunctions.some((filterFunction) => !filterFunction(row, filters))) {
                return acc;
            }
            return acc.push(row);
        }, List())
    ), [data, filters, filterFunctions]);

    return (
        <>
            <Block>
                <Loading loading={loading}>
                    <Confirmation
                        title={t(`delete.button.label`)}
                        text={t(`confirmation.text`)}
                        onDelete={() => onDelete(deleteConfirmation)}
                        onClose={() => setDeleteConfirmation(undefined)}
                        open={!!deleteConfirmation}
                    />
                    <TableControl
                        setColumnHiddenDataFields={setColumnHiddenDataFields}
                        columnHiddenDataFields={columnHiddenDataFields}
                        advancedSearchComponent={advancedSearchComponent}
                        setFiltersToUrl={setFiltersToUrl}
                        columns={columns}
                        quickSearchPlaceholder={quickSearchPlaceholder}
                        onCreate={onCreate}
                        title={title}
                        filters={filters}
                    />
                    {filteredData.size > 0 && (
                        <div className={css.table}>
                            <Table
                                columns={columns}
                                data={filteredData}
                                actions={tableActions}
                                onRowClick={onRowClick}
                                columnHiddenDataFields={columnHiddenDataFields}
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
    setFiltersToUrl: PropTypes.func.isRequired,
    data: ImmutablePropTypes.list,
    loading: PropTypes.bool,
    onEdit: PropTypes.func,
    onDelete: PropTypes.func,
    onCreate: PropTypes.func,
    onCustomAction: PropTypes.func,
    quickSearchPlaceholder: PropTypes.string,
    onRowClick: PropTypes.func,
    onUnshare: PropTypes.func,
    // connected component
    advancedSearchComponent: PropTypes.object,
    filterFunctions: PropTypes.arrayOf(PropTypes.func),
};

Data.defaultProps = {
    data: List(),
    loading: false,
    onEdit: undefined,
    onDelete: undefined,
    onCreate: undefined,
    onCustomAction: undefined,
    quickSearchPlaceholder: "",
    onRowClick: undefined,
    advancedSearchComponent: undefined,
    filterFunctions: [],
    onUnshare: undefined,
};

export default Data;
