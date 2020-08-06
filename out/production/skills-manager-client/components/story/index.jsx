import React from "react";
import {LoremIpsum} from "lorem-ipsum";

export {storiesOf} from "@storybook/react";
export {
    text,
    boolean,
    select,
    number,
    optionsKnob,
    array as options,
} from "@storybook/addon-knobs";
export {action} from "@storybook/addon-actions";

export const lorem = new LoremIpsum({});
const text = lorem.generateParagraphs(15);
const shorText = lorem.generateWords(3);

// Colored placeholder used for filling layouts
export const coloredPlaceholder = (color, long = false) => (long ? (
    <div style={{background: color, height: "100%", overflowX: "auto"}}>{text}</div>
) : (
    <div style={{background: color, height: "100%"}}>{shorText}</div>
));
export const LayoutWrapper = (Component) => (width = 400, height = 300) => (props) => (
    <div style={{width: `${width}px`, height: `${height}px`}}>
        <Component {...props} />
    </div>
);
