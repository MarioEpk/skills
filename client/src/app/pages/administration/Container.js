import React from "react";

import {TwoColumns} from "components";
import {PageTitle} from "app/containers";
import i18n from "core/i18n";

import DataTable from "./DataTable";
import {availableTypes, SEARCH_TABLE_FIELD} from "./constants";
import form, {ProjectForm} from "./form";

const Container = () => {
    const {t} = i18n.useTranslation();

    return (
        <>
            <PageTitle title={t(`administration.title`)} />
            <DataTable
                title={t(`projects.title`)}
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
                    columnName: "name",
                },
                {
                    key: "3",
                    dataField: "description",
                    columnName: "project.description",
                },
                {
                    key: "4",
                    dataField: "technologies",
                    columnName: "used.technologies",
                    dataFormat: (data) => data.map((item) => item.get("name")).join(", "),
                },
                ]}
            />
            <TwoColumns
                left={(
                    <>
                        <DataTable
                            title={t(`languages.title`)}
                            typeName={availableTypes.LANGUAGE}
                            form={form.createForm(availableTypes.LANGUAGE)}
                        />
                        <DataTable
                            title={t(`technologies.title`)}
                            typeName={availableTypes.TECHNOLOGY}
                            form={form.createForm(availableTypes.TECHNOLOGY)}
                        />
                    </>
                )}
                right={(
                    <>
                        <DataTable
                            title={t(`skills.title`)}
                            typeName={availableTypes.SKILL}
                            form={form.createForm(availableTypes.SKILL)}
                        />
                        <DataTable
                            title={t(`positions.title`)}
                            typeName={availableTypes.POSITION}
                            form={form.createForm(availableTypes.POSITION)}
                        />
                    </>
                )}
            />
        </>
    );
};

export default Container;
