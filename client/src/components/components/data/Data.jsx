import React, {useEffect, useState} from "react";
import {List} from "immutable";
import ImmutablePropTypes from "react-immutable-proptypes";
import PropTypes from "prop-types";
import {AddRounded} from "@material-ui/icons";

import SearchInput from "./SearchInput";
import {Block} from "../block";
import {Table} from "../table";
import {Button} from "../button";
import {Loading} from "../loading";
import {columnsPropTypes} from "../table/util";

import css from "./Data.module.scss";
import {Confirmation} from "../confirmation";

const Data = ({
    title,
    columns,
    data,
    loading,
    searchByDataField,
    onEdit,
    onDelete,
    onCreate,
    onCustomAction,
}) => {
    const [filteredData, setFilteredData] = useState(data);
    const [searchValue, setSearchValue] = useState("");

    useEffect(() => {
        filterData(searchValue);
    }, [data]);

    const [deleteConfirmation, setDeleteConfirmation] = useState(undefined);
    const tableActions = {
        columnName: "Akce",
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
        if (searchByDataField) {
            const result = data.filter((row) => row.getIn(searchByDataField.split('.'), "").toString().toLowerCase().includes(value.toLowerCase()));
            setFilteredData(result);
        } else {
            setFilteredData(data);
        }
    };

    return (
        <Block>
            <Loading loading={loading}>
                <Confirmation
                    title="Smazat"
                    text="Opravdu chcete položku smazat?"
                    onDelete={() => onDelete(deleteConfirmation)}
                    onClose={() => setDeleteConfirmation(undefined)}
                    open={!!deleteConfirmation}
                />
                <div className={css.control}>
                    <h2 className={css.title}>{title}</h2>
                    {!!searchByDataField
                    && (
                        <span className={css.search}>
                            <SearchInput label="Hledej" value={searchValue} onChange={onSearch} name={`${title}-search`} />
                        </span>
                    )}
                    {onCreate && (
                        <Button
                            onClick={onCreate}
                            label="Přidat"
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
    searchByDataField: PropTypes.string,
    onEdit: PropTypes.func,
    onDelete: PropTypes.func,
    onCreate: PropTypes.func,
    onCustomAction: PropTypes.func,
};

Data.defaultProps = {
    data: List(),
    loading: false,
    searchByDataField: undefined,
    onEdit: undefined,
    onDelete: undefined,
    onCreate: undefined,
    onCustomAction: undefined,
};

export default Data;
