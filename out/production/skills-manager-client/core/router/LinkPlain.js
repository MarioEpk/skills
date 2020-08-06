import {createElement} from 'react';
import PropTypes from 'prop-types';

const wrapOnClick = (onClick) => (e) => {
    if (e.stopPropagation) {
        e.stopPropagation();
    }
    if (e.preventDefault) {
        e.preventDefault();
    }
    onClick(e);
    return false;
};

/**
 * Creates link. When href is not specified, will be rendered as a <span>, otherwise as an <a>.
 */
const LinkPlain = ({children, className, href, onClick, newTab}) => {
    const element = href ? "a" : "span";
    const props = {
        className,
        onClick: onClick ? wrapOnClick(onClick) : undefined,
        href: href || undefined,
        target: newTab ? "_blank" : undefined,
        rel: newTab ? "noopener noreferrer" : undefined, // https://www.owasp.org/index.php/HTML5_Security_Cheat_Sheet#Tabnabbing
    };

    return createElement(element, props, children);
};

LinkPlain.propTypes = {
    /** Showed name attribute. */
    children: PropTypes.node.isRequired,
    /** Link href="" attribute, ignored when onClick is defined. */
    href: PropTypes.string,
    /** Action fired when link is clicked. */
    onClick: PropTypes.func,
    /** Default click will open in new tab. */
    newTab: PropTypes.bool,
};

LinkPlain.defaultProps = {
    href: null,
    onClick: null,
    newTab: false,
};

export default LinkPlain;
