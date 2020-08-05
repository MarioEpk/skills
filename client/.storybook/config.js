import React from "react";
import {withKnobs} from "@storybook/addon-knobs/react";
import {configure, addDecorator, storiesOf} from "@storybook/react";

const FILENAME_REGEXP = /\..*\/(.*?)\.story\.js/;

const componentsContext = require.context('../src/components/components', true, /\.story\.js$/);
const componentsStories = storiesOf("Components", module);

const layoutContext = require.context('../src/components/layouts', true, /\.story\.js$/);
const layoutStories = storiesOf("Layouts", module);

addDecorator(withKnobs);

configure(() => {
    addStories(componentsContext, componentsStories);
    addStories(layoutContext, layoutStories);
}, module);

function addStories(context, stories) {
    context.keys().forEach((filename) => {
        const story = context(filename).default;

        if(story) {
            const name = FILENAME_REGEXP.exec(filename)[1];
            if(Array.isArray(story)){
                addStory(stories, story, name);
            } else {
                Object.keys(story).forEach((subName) => {
                    addStory(stories, story[subName], `${name}/${subName}`);
                })
            }
        }
    })
}

function addStory(stories, story, name) {
    const [Component, createProps = () => ({})] = story;
    stories.add(name, () => (
        <Component {...createProps()} />
    ));
}
