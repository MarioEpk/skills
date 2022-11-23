import React from "react";

import {TwoColumns} from "components";
import {PageTitle} from "app/containers";
import i18n from "core/i18n";
import types from "core/types";

import DataTable from "./DataTable";
import form, {ProjectForm} from "./form";

const Container = () => {
    const {t} = i18n.useTranslation();

    return (
        <>
            <PageTitle title={t("administration.title")} />
            <DataTable
                title={t("projects.title")}
                typeName={types.availableTypes.PROJECT}
                form={ProjectForm}
                columns={[{
                    key: "1",
                    dataField: "id",
                    isKey: true,
                    columnName: "ID",
                    defaultHidden: true,
                }, {
                    key: "2",
                    dataField: "name",
                    columnName: "name",
                }, {
                    key: "3",
                    dataField: "exportName",
                    columnName: "project.exportName",
                    defaultHidden: true,
                }, {
                    key: "4",
                    dataField: "description",
                    columnName: "project.description",
                }, {
                    key: "5",
                    dataField: "technologies",
                    columnName: "used.technologies",
                    dataFormat: (data) => data.map((item) => item.get("name")).join(", "),
                }]}
            />
            <TwoColumns
                left={(
                    <>
                        <DataTable
                            title={t("languages.title")}
                            typeName={types.availableTypes.LANGUAGE}
                            form={form.createForm(types.availableTypes.LANGUAGE)}
                        />
                        <DataTable
                            title={t("technologies.title")}
                            typeName={types.availableTypes.TECHNOLOGY}
                            form={form.createForm(types.availableTypes.TECHNOLOGY)}
                        />
                    </>
                )}
                right={(
                    <>
                        <DataTable
                            title={t("skills.title")}
                            typeName={types.availableTypes.SKILL}
                            form={form.createForm(types.availableTypes.SKILL)}
                        />
                        <DataTable
                            title={t("positions.title")}
                            typeName={types.availableTypes.POSITION}
                            form={form.createForm(types.availableTypes.POSITION)}
                        />
                    </>
                )}
            />
        </>
    );
};

export default Container;
