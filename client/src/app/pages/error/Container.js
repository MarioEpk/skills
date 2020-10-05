import React from "react";
import {PageTitle} from "app/containers";

import unauthorized from "resources/images/not-authorized.png";
import {Unauthorized} from "components";

export default () => (
    <>
        <PageTitle title="error" />
        <Unauthorized img={<img src={unauthorized} alt="not-athorized" />} />
    </>
);
