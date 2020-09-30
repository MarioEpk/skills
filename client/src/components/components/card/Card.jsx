import React from "react";
import PropTypes from "prop-types";

import {Delete, Edit} from "@material-ui/icons";
import css from "./Card.module.scss";
import {IconButton} from "../button";

const Card = ({title, secondTitle, date, onDelete, onEdit, children}) => (
    <div className={css.main}>
        <div>
            <h3>{title}</h3>
            <span className={css.controls}>
                {onEdit && (
                    <IconButton
                        icon={<Edit />}
                        ariaLabel="edit"
                        onClick={onEdit}
                    />
                )}
                {onDelete && (
                    <IconButton
                        icon={<Delete />}
                        ariaLabel="delete"
                        onClick={onDelete}
                    />
                )}
            </span>
        </div>
        {secondTitle && <h4>{secondTitle}</h4>}
        {date && <div className={css.date}>{date}</div>}
        {children && <div className={css.children}>{children}</div>}
    </div>
);

Card.propTypes = {
    title: PropTypes.string.isRequired,
    secondTitle: PropTypes.string,
    date: PropTypes.string,
    children: PropTypes.node,
    onDelete: PropTypes.func,
    onEdit: PropTypes.func,
};

Card.defaultProps = {
    secondTitle: null,
    date: null,
    children: null,
    onDelete: undefined,
    onEdit: undefined,
};

export default Card;
