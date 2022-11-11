import React, {useEffect, useState} from "react";
import {List} from "immutable";
import ImmutablePropTypes from "react-immutable-proptypes";
import PropTypes from "prop-types";
import {AddRounded} from "@material-ui/icons";
import removeAccents from "remove-accents";
import i18n from "core/i18n";
import SearchInput from "./SearchInput";
import {Block} from "../block";
import {Table, columnsPropTypes} from "../table";
import {Button} from "../button";
import {Loading} from "../loading";
import {Confirmation} from "../confirmation";

import css from "./Data.module.scss";

const Data = ({
    title,
    columns,
    data,
    loading,
    searchByDataFields,
    onEdit,
    onDelete,
    onCreate,
    onCustomAction,
}) => {
    const [filteredData, setFilteredData] = useState(data);
    const [searchValue, setSearchValue] = useState("");
    const {t} = i18n.useTranslation();

    useEffect(() => {
        filterData(searchValue);
    }, [data]);

    const [deleteConfirmation, setDeleteConfirmation] = useState(undefined);
    const tableActions = {
        columnName: "Actions",
        onEdit,
        onDelete: onDelete ? (row) => setDeleteConfirmation(row) : undefined,
        custom: onCustomAction,
        align: 'right',
    };

    const onSearch = (e) => {
        const {value} = e.target;
        setSearchValue(value);
        filterData(value);
    };

    const filterData = (value) => {
        if (searchByDataFields) {
            const result = data.filter((row) => (
                searchByDataFields.some((searchField) => (
                    removeAccents(row.getIn(searchField.split('.'), "").toLowerCase()).includes(removeAccents(value.toLowerCase()))
                ))
            ));
            setFilteredData(result);
        } else {
            setFilteredData(data);
        }
    };

    return (
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
                    {!!searchByDataFields
                    && (
                        <span className={css.search}>
                            <SearchInput label={t(`search.label`)} value={searchValue} onChange={onSearch} name={`${title}-search`} />
                        </span>
                    )}
                    {onCreate && (
                        <Button
                            onClick={onCreate}
                            label={t(`add.button.label`)}
                            startIcon={<AddRounded />}
                            type={Button.type.COLORED}
                        />
                    )}
                </div>
                {data.size > 0 && (
                    <div className={css.table}>
                        <Table
                            columns={columns}
                            data={filteredData}
                            actions={tableActions}
                        />
                    </div>
                )}
            </Loading>
        </Block>
    );
};

Data.propTypes = {
    title: PropTypes.string.isRequired,
    columns: columnsPropTypes.isRequired,
    data: ImmutablePropTypes.list,
    loading: PropTypes.bool,
    searchByDataFields: PropTypes.arrayOf(PropTypes.string),
    onEdit: PropTypes.func,
    onDelete: PropTypes.func,
    onCreate: PropTypes.func,
    onCustomAction: PropTypes.func,
};

Data.defaultProps = {
    data: List(),
    loading: false,
    searchByDataFields: undefined,
    onEdit: undefined,
    onDelete: undefined,
    onCreate: undefined,
    onCustomAction: undefined,
};

export default Data;
