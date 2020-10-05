import React, {useState} from "react";
import IPropTypes from "react-immutable-proptypes";
import invariant from "invariant";
import classnames from "classnames";
import PropTypes from "prop-types";
import TextFieldUI from '@material-ui/core/TextField';

import {KeyboardArrowDown, Add} from '@material-ui/icons';

import css from "./Menu.module.scss";

const Menu = ({title, items, onClick}) => {
    invariant((items || onClick) && !(items && onClick), "You have to define onClick or items, you can't define both");

    const [isOpen, setIsOpen] = useState(false);
    const [searchText, setSearchText] = useState("");

    const hasNoItems = () => items && items.size === 0 && !onClick;

    const onOpen = () => {
        if (onClick) {
            onClick();
        } else if (!hasNoItems()) {
            setIsOpen(!isOpen);
        }
    };

    const createIcon = () => {
        if (items && items.size > 0) {
            return <KeyboardArrowDown className={classnames({[css.open]: isOpen})} />;
        } else {
            return onClick ? <Add /> : null;
        }
    };

    const onChangeSearch = (e) => {
        setSearchText(e.target.value);
    };

    const getFilteredData = () => {
        if (searchText === "") {
            return items;
        } else {
            return items.filter((item) => item.title.toLowerCase().includes(searchText.toLowerCase()));
        }
    };

    return (
        <div className={classnames(css.main, {[css.mainOpen]: isOpen})}>
            <div onClick={onOpen} onKeyDown={onOpen} className={classnames(css.title, {[css.disabled]: hasNoItems()})}>
                <h2>{title}</h2>
                {createIcon()}
            </div>
            {
                isOpen && (
                    <>
                        <div
                            className={css.inputWrapper}
                        >
                            <TextFieldUI
                                className={css.input}
                                onChange={onChangeSearch}
                                onBlur={onChangeSearch}
                                value={searchText}
                                label="Search"
                                variant="outlined"
                                InputLabelProps={{shrink: true}}
                            />
                        </div>
                        {
                            items && getFilteredData().map((item) => (
                                <div
                                    key={item.title}
                                    onKeyDown={item.onClick}
                                    onClick={item.onClick}
                                    className={css.item}
                                >
                                    {item.title}
                                </div>
                            ))
                        }
                    </>
                )
            }
        </div>
    );
};

Menu.propTypes = {
    title: PropTypes.string.isRequired,
    items: IPropTypes.list,
    onClick: PropTypes.func,
};

Menu.defaultProps = {
    items: undefined,
    onClick: undefined,
};

export default Menu;
