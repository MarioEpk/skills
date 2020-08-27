import React, {useState} from "react";
import invariant from "invariant";
import PropTypes from "prop-types";

// import css from "./Card.module.scss";

/**
 * Create Menu component for adding abilities.
 * Use storybook for styling and checking all possible options for Menu
 * Component should support title, type, items with onClick action or only onClick action props
 * If prop items is defined there will be arrow on right side, component will have two state open and close
 * If prop onClick is defined there will be plus on right side
 * Fonts are already imported, use font-family: 'Gotham Narrow' for title and 'Montserrat' for items
 * You can use shadow style from Block component
*/
const Menu = ({title, type, items, onClick}) => {
    invariant((items || onClick) && !(items && onClick), "You have to define onClick or items, you can't define both");

    const [isOpen, setIsOpen] = useState(false);

    return (
        <div>
            Card
        </div>
    );
};

Menu.propTypes = {
    title: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    items: PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.string.isRequired,
        onCLick: PropTypes.func.isRequired,
    })),
    onClick: PropTypes.func,
};

Menu.defaultProps = {
    items: undefined,
    onClick: undefined,
};

export default Menu;
