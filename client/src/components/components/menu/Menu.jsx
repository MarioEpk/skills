/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
import React, {useState} from "react";
import IPropTypes from "react-immutable-proptypes";
import invariant from "invariant";
import classnames from "classnames";
import PropTypes from "prop-types";
import {KeyboardArrowDown, Add} from '@material-ui/icons';

import {SearchInput} from "../data";
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

    const onEnterFunction = (func) => (event) => {
        if (event.keyCode === 13) {
            // Cancel the default action, if needed
            event.preventDefault();
            func();
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
            <div tabIndex={0} onClick={onOpen} onKeyDown={onEnterFunction(onOpen)} className={classnames(css.title, {[css.disabled]: hasNoItems()})}>
                <h2>{title}</h2>
                {createIcon()}
            </div>
            {
                isOpen && (
                    <>
                        <div
                            className={css.inputWrapper}
                        >
                            <SearchInput
                                name="menu-search"
                                className={css.input}
                                onChange={onChangeSearch}
                                onBlur={onChangeSearch}
                                value={searchText}
                                label="Search"
                            />
                        </div>
                        {
                            items && getFilteredData().map((item) => (
                                <div
                                    key={item.title}
                                    tabIndex={item.disabled ? undefined : 0}
                                    onKeyDown={item.disabled ? undefined : onEnterFunction(item.onClick)}
                                    onClick={item.disabled ? undefined : item.onClick}
                                    className={classnames(css.item, {[css.disabled]: item.disabled})}
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
