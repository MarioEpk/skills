import React from "react";
import {useDispatch, useSelector} from "react-redux";

import {Button} from "components";
import router from "core/router";
import i18n from "core/i18n";
import {OVERVIEW} from "app/constants";
import {PageTitle} from "app/containers";

import Table from "./Table";
import {getRows} from "./selectors";

const Container = () => {
    const {t} = i18n.useTranslation();
    const dispatch = useDispatch();
    const rows = useSelector(getRows);
    return (
        <>
            <PageTitle title="page2" />
            {t("page.page2")}
            <Table rows={rows} />
            <br />
            <Button onClick={() => dispatch(router.navigate(OVERVIEW))} label="Page 1" />
        </>
    );
};

export default Container;
