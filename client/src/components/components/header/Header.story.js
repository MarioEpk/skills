import React from "react";

import {boolean} from "components/story";

import Header from "./Header";
import {Navigation} from "../navigation";

export default [Header, () => ({
    login: <div>LoginButton</div>,
    logout: <div>LogoutButton</div>,
    isAuthenticated: boolean("isAuthenticated", true),
    navigation: <Navigation links={[<a key={1} href="/">link</a>]} />,
})];
