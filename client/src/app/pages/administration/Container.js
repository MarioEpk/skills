import React from "react";
import {connect} from "react-redux";

import {PageTitle} from "app/containers";
import DataTable from "./DataTable";
import {availableTypes} from "./constants";

const Container = () => (
    <>
        <PageTitle title="Administrace" />
        <DataTable
            title="Jazyky"
            typeName={availableTypes.LANGUAGE}
        />
    </>
);

export default connect(Container)(Container);
