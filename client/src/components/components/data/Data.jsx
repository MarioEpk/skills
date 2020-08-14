import React from "react";
import {List} from "immutable";
import ImmutablePropTypes from "react-immutable-proptypes";
import PropTypes from "prop-types";

import {AddRounded} from "@material-ui/icons";
import {Block} from "../block";
import {Table} from "../table";
import {Button} from "../button";
import {Loading} from "../loading";
import {columnsPropTypes} from "../table/util";
import {SearchInput} from "../input";

import css from "./Data.module.scss";

const Data = ({
    title,
    columns,
    data,
    loading,
    onSearch,
    onUpdate,
    onDelete,
    onCreate,
}) => (
    <Block>
        <Loading loading={loading}>
            <div className={css.main}>
                <div className={css.control}>
                    <h2 className={css.title}>{title}</h2>
                    {onSearch
                    && (
                        <span className={css.search}>
                            <SearchInput label="Hledej" onChange={onSearch} name={`${title}-search`} />
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
                <Table
                    columns={columns}
                    data={data}
                    onUpdate={onUpdate}
                    onDelete={onDelete}
                />
            </div>
        </Loading>
    </Block>
);

Data.proTypes = {
    title: PropTypes.string.isRequired,
    columns: columnsPropTypes.isRequired,
    data: ImmutablePropTypes.list,
    loading: PropTypes.bool,
    onSearch: PropTypes.func,
    onUpdate: PropTypes.func,
    onDelete: PropTypes.func,
    onCreate: PropTypes.func,
};

Data.defaultProps = {
    data: List(),
    loading: false,
    onSearch: undefined,
    onUpdate: undefined,
    onDelete: undefined,
    onCreate: undefined,
};

export default Data;
