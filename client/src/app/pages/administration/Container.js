import React from "react";

import {TwoColumns} from "components";
import {PageTitle} from "app/containers";

import DataTable from "./DataTable";
import {availableTypes, SEARCH_TABLE_FIELD} from "./constants";
import form, {ProjectForm} from "./form";

const Container = () => (
    <>
        <PageTitle title="Administration" />
        <DataTable
            title="Projects"
            typeName={availableTypes.PROJECT}
            form={ProjectForm}
            columns={[{
                key: "1",
                dataField: "id",
                isKey: true,
                columnName: "ID",
            }, {
                key: "2",
                dataField: SEARCH_TABLE_FIELD,
                columnName: "Name",
            },
            {
                key: "3",
                dataField: "description",
                columnName: "Project description",
            },
            {
                key: "4",
                dataField: "technologies",
                columnName: "Used technologies",
                dataFormat: (data) => data.map((item) => item.get("name")).join(", "),
            },
            ]}
        />
        <TwoColumns
            left={(
                <>
                    <DataTable
                        title="Languages"
                        typeName={availableTypes.LANGUAGE}
                        form={form.createForm(availableTypes.LANGUAGE)}
                    />
                    <DataTable
                        title="Technologies"
                        typeName={availableTypes.TECHNOLOGY}
                        form={form.createForm(availableTypes.TECHNOLOGY)}
                    />
                </>
            )}
            right={(
                <>
                    <DataTable
                        title="Skills"
                        typeName={availableTypes.SKILL}
                        form={form.createForm(availableTypes.SKILL)}
                    />
                    <DataTable
                        title="Positions"
                        typeName={availableTypes.POSITION}
                        form={form.createForm(availableTypes.POSITION)}
                    />
                </>
            )}
        />
    </>
);

export default Container;
