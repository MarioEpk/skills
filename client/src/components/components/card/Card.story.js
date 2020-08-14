import React from "react";

import Card from "./Card";

const children = (
    <>
        children
    </>
);

export default [Card, () => ({
    children,
    title: "Bla bla",
})];
