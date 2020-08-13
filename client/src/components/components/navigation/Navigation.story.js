import React from "react";

import Navigation from "./Navigation";
import Button from "../button/Button";

export default [Navigation, () => ({
    links: [
        <Button key={1} href="/">link1</Button>,
        <Button key={2} href="/">link2</Button>,
        <Button key={3} href="/">link3</Button>,
    ],
})];
