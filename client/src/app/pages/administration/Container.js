import React from "react";

import {TwoColumns} from "components";
import {PageTitle} from "app/containers";
import DataTable from "./DataTable";
import {availableTypes, SEARCH_TABLE_FIELD} from "./constants";
import form, {ProjectForm} from "./form";

const Container = () => (
    <>
        <PageTitle title="Administrace" />
        <DataTable
            title="Projekty"
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
                columnName: "Název",
            },
            {
                key: "3",
                dataField: "description",
                columnName: "Popis projektu",
            }]}
        />
        <TwoColumns
            left={(
                <>
                    <DataTable
                        title="Jazyky"
                        typeName={availableTypes.LANGUAGE}
                        form={form.createForm(availableTypes.LANGUAGE)}
                    />
                    <DataTable
                        title="Technologie"
                        typeName={availableTypes.TECHNOLOGY}
                        form={form.createForm(availableTypes.TECHNOLOGY)}
                    />
                </>
            )}
            right={(
                <DataTable
                    title="Schopnosti"
                    typeName={availableTypes.SKILL}
                    form={form.createForm(availableTypes.SKILL)}
                />
            )}
        />
    </>
);

export default Container;
