import React from "react";
import PropTypes from "prop-types";

// import css from "./Card.module.scss";

/**
 * Create Card component for representation of abilities.
 * Use storybook for styling and checking all possible options for Card
 * Component should support title, secondTitle, date, children props
 * Fonts are already imported, you can just use font-family: 'Gotham Narrow'
 * You can use shadow style from Block component
*/
const Card = ({title, secondTitle, date}) => (
    <div>
        Ahoj
    
        <span>{title}</span>
        <span>{secondTitle}</span>
        <span>{date}</span>
    </div>
);

Card.propTypes = {
    title: PropTypes.string.isRequired,
    secondTitle: PropTypes.string,
    date:PropTypes.string,
    
};

Card.defaulProps = {
    secondTitle: "Ahoj",
    date: null,
};


export default Card;
