import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import IPropTypes from "react-immutable-proptypes";
import {CheckCircleOutline} from "@material-ui/icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowUpRightFromSquare} from "@fortawesome/free-solid-svg-icons";

import i18n from "core/i18n";
import modal from "core/modal";
import {Cv} from "app/model/cv";
import coreExport from "core/export";
import access, {accesses} from "core/access";
import {Data, Modal, IconButton} from "components";
import {navigate} from "core/router/actions";
import {dateFormatter, formatLongText} from "core/util";
import {CV, OVERVIEW} from 'app/constants';
import {useSetFiltersToUrl} from "core/url";

import {faFilePdf, faFileWord} from '@fortawesome/free-regular-svg-icons';
import {MODAL_FORM_NAME, OVERVIEW_TABLE_ID} from "./constants";
import {cvActionGroup} from "./actions";
import {getData} from "./selectors";
import {Form} from "./form";
import AdvancedSearch from "./AdvancedSearch";
import {overviewFilterFunctions} from "./filters";

const columns = [{
    key: "1",
    dataField: "id",
    isKey: true,
    columnName: "ID",
    defaultHidden: true,
}, {
    key: "2",
    dataField: "user.firstName",
    columnName: "first.name",
}, {
    key: "3",
    dataField: "user.lastName",
    columnName: "last.name",
}, {
    key: "4",
    dataField: "user.email",
    columnName: "email.name",
    defaultHidden: true,
}, {
    key: "6",
    dataField: "projects",
    columnName: "projects.name",
    defaultHidden: true,
    dataFormat: (projects) => formatLongText(projects ? projects.map(({projectType}) => projectType.name).join(", ") : ""),
}, {
    key: "7",
    dataField: "technologies",
    columnName: "technologies.name",
    defaultHidden: true,
    dataFormat: (technologies) => formatLongText(technologies ? technologies.map(({technologyType}) => technologyType.name).join(", ") : ""),
}, {
    key: "8",
    dataField: "skills",
    columnName: "skills.name",
    defaultHidden: true,
    dataFormat: (skills) => formatLongText(skills ? skills.map(({skillType}) => skillType.name).join(", ") : ""),
}, {
    key: "9",
    dataField: "positions",
    columnName: "positions.name",
    defaultHidden: true,
    dataFormat: (positions) => formatLongText(positions ? positions.map(({name}) => name).join(", ") : ""),
}, {
    key: "10",
    dataField: "languages",
    columnName: "languages.name",
    defaultHidden: true,
    dataFormat: (languages) => formatLongText(languages ? languages.map(({languageType}) => languageType.name).join(", ") : ""),
}, {
    key: "11",
    dataField: "shared",
    columnName: "shared",
    collapsed: true,
    align: "center",
    defaultHidden: true,
    dataFormat: (data) => (data ? (<CheckCircleOutline />) : null),
}, {
    key: "12",
    dataField: "updatedAt",
    columnName: "updated.at",
    noWrap: true,
    dataFormat: (date) => dateFormatter.format(new Date(date)),
}];

const DataTable = ({
    data,
    loading,
    openModal,
    closeModal,
    isFormModalOpen,
    onDelete,
    onExportToPdf,
    onExportToDoc,
    onShare,
    onCopyPublicUrl,
    navigateTo,
}) => {
    const {t} = i18n.useTranslation();
    const setFiltersToUrl = useSetFiltersToUrl(OVERVIEW_TABLE_ID, OVERVIEW);

    const onCustomAction = (row) => {
        const cvId = row.get("id");
        const user = row.get("user");
        const shared = row.get('shared');
        const extCode = row.get('externalCode');
        return ([
            <IconButton key="exportToPdf" icon={<FontAwesomeIcon icon={faFilePdf} />} onClick={() => onExportToPdf(cvId, user.firstName, user.lastName)} ariaLabel={t(`cv.generate.pdf.label`)} />,
            <IconButton key="exportToDoc" icon={<FontAwesomeIcon icon={faFileWord} />} onClick={() => onExportToDoc(cvId, user.firstName, user.lastName)} ariaLabel={t(`cv.generate.doc.label`)} />,
            <IconButton
                key="copyPublicUrl"
                icon={<FontAwesomeIcon icon={faArrowUpRightFromSquare} />}
                onClick={() => onCopyPublicUrl(cvId, shared, extCode)}
                ariaLabel={t(`cv.copy.public.link.label`)}
            />,
        ]);
    };
    const onCreate = () => {
        openModal();
    };

    const adminAccess = access.useAccess([accesses.admin]);

    const onRowClick = (row) => {
        const id = row.get("id");
        navigateTo(CV, {id});
    };

    return (
        <>
            <Data
                tableId={OVERVIEW_TABLE_ID}
                title={t("overview.title")}
                columns={columns}
                data={data}
                loading={loading}
                onCreate={adminAccess(onCreate)}
                onCustomAction={onCustomAction}
                onDelete={adminAccess((row) => onDelete(row.get("id")))}
                quickSearchPlaceholder={t("overview.search.placeholder")}
                onUnshare={adminAccess((row) => onShare(row.get("id")))}
                onRowClick={onRowClick}
                advancedSearchComponent={AdvancedSearch}
                setFiltersToUrl={setFiltersToUrl}
                filterFunctions={overviewFilterFunctions}
            />
            <Modal
                open={isFormModalOpen}
                onClose={closeModal}
            >
                <Form onClose={closeModal} />
            </Modal>
        </>
    );
};

DataTable.propTypes = {
    data: IPropTypes.listOf(Cv).isRequired,
    openModal: PropTypes.func.isRequired,
    closeModal: PropTypes.func.isRequired,
    isFormModalOpen: PropTypes.bool.isRequired,
    onDelete: PropTypes.func.isRequired,
    onExportToPdf: PropTypes.func.isRequired,
    onExportToDoc: PropTypes.func.isRequired,
    onShare: PropTypes.func.isRequired,
    onCopyPublicUrl: PropTypes.func.isRequired,
    loading: PropTypes.bool,
    navigateTo: PropTypes.func.isRequired,
};

DataTable.defaultProps = {
    loading: false,
};

const mapStateToProps = (state) => ({
    isFormModalOpen: modal.isOpen(state, MODAL_FORM_NAME),
    data: getData(state),
});

const mapDispatchToProps = (dispatch) => ({
    openModal: () => dispatch(modal.open(MODAL_FORM_NAME)),
    closeModal: () => dispatch(modal.close(MODAL_FORM_NAME)),
    onDelete: (id) => dispatch(cvActionGroup.remove(id)),
    onExportToPdf: (id, firstName, lastName) => dispatch(coreExport.exportCv(id, firstName, lastName)),
    onExportToDoc: (id, firstName, lastName) => dispatch(coreExport.exportCvToDoc(id, firstName, lastName)),
    navigateTo: (route, params, query) => dispatch(navigate(route, params, query)),
    onShare: (id) => dispatch(cvActionGroup.shareCv(id)),
    onCopyPublicUrl: (cvId, shared, extCode) => dispatch(cvActionGroup.copyPublicUrl(cvId, shared, extCode)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DataTable);
