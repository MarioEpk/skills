import React from "react";
import PropTypes from "prop-types";

import {Delete} from "@material-ui/icons";
import css from "./Card.module.scss";
import {IconButton} from "../button";

const Card = ({title, secondTitle, date, onDelete, children}) => (
    <div className={css.main}>
        <div className={css.row}>
            <h3>{title}</h3>
            <span className={css.controls}>
                {onDelete && (
                    <IconButton
                        icon={<Delete classnamesclassName={css.icon} />}
                        ariaLabel="delete"
                        onClick={onDelete}
                    />
                )}
            </span>
        </div>
        {secondTitle && <h4>{secondTitle}</h4>}
        {date && <span>{date}</span>}
        {children}
    </div>
);

Card.propTypes = {
    title: PropTypes.string.isRequired,
    secondTitle: PropTypes.string,
    date: PropTypes.string,
    children: PropTypes.node,
    onDelete: PropTypes.func,
};

Card.defaultProps = {
    secondTitle: null,
    date: null,
    children: null,
    onDelete: undefined,
};

export default Card;
