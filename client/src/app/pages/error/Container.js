import React from "react";

import {PageTitle} from "app/containers";
import {Unauthorized} from "components";

import unauthorized from "resources/images/not-authorized.png";

export default () => (
    <>
        <PageTitle title="error" />
        <Unauthorized img={<img src={unauthorized} alt="not-athorized" />} />
    </>
);
