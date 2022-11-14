import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import IPropTypes from "react-immutable-proptypes";
import {Edit, GetApp} from "@material-ui/icons";

import i18n from "core/i18n";
import modal from "core/modal";
import {Type} from "app/model/type";
import coreExport from "core/export";
import access, {accesses} from "core/access";
import {Button, Data, Modal} from "components";

import {MODAL_FORM_NAME, SEARCH_TABLE_FIELDS} from "./constants";
import {cvActionGroup} from "./actions";
import {getData} from "./selectors";
import {Form} from "./form";

const columns = [{
    key: "1",
    dataField: "id",
    isKey: true,
    columnName: "ID",
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
    dataField: "updatedAt",
    columnName: "updated.at",
}];

const DataTable = ({
    data,
    loading,
    openModal,
    closeModal,
    isFormModalOpen,
    onDelete,
    onExport,
}) => {
    const {t} = i18n.useTranslation();

    const onCustomAction = (row) => {
        const cvId = row.get("id");
        const user = row.get("user");
        return ([
            <Button key="redirect" href={`/${cvId}`} label={t(`edit.button.label`)} startIcon={<Edit />} />,
            <Button key="export" onClick={() => onExport(cvId, user.lastName)} label={t(`export.button.label`)} startIcon={<GetApp />} />,
        ]);
    };
    const onCreate = () => {
        openModal();
    };

    const adminAccess = access.useAccess([accesses.admin]);

    return (
        <>
            <Data
                title="CVs"
                columns={columns}
                data={data}
                loading={loading}
                onCreate={adminAccess(onCreate)}
                onCustomAction={onCustomAction}
                onDelete={adminAccess((row) => onDelete(row.get("id")))}
                searchByDataFields={data.size > 0 ? SEARCH_TABLE_FIELDS : undefined}
                searchPlaceholder="by first name or last name"
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
    data: IPropTypes.listOf(Type).isRequired,
    openModal: PropTypes.func.isRequired,
    closeModal: PropTypes.func.isRequired,
    isFormModalOpen: PropTypes.bool.isRequired,
    onDelete: PropTypes.func.isRequired,
    onExport: PropTypes.func.isRequired,
    loading: PropTypes.bool,
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
    onExport: (id, lastName) => dispatch(coreExport.exportCv(id, lastName)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DataTable);
