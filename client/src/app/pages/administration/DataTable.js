import React, {useState} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import IPropTypes from "react-immutable-proptypes";

import modal from "core/modal";
import i18n from "core/i18n";
import types from "core/types";
import {Type} from "app/model/type";
import {Data, Modal, columnsPropTypes} from "components";

import {getTypeData, forceDeleteConfirmationId} from "./selectors";
import {availableTypesArray, modalFormName, SEARCH_TABLE_FIELDS} from "./constants";
import {createTypeActionGroup} from "./actions";
import {Confirmation} from "../../../components/components/confirmation";

const defaultColumns = [{
    key: "1",
    dataField: "id",
    isKey: true,
    columnName: "ID",
    defaultHidden: true,
}, {
    key: "2",
    dataField: "name",
    columnName: "name",
}];

const DataTable = ({
    data,
    title,
    loading,
    typeName,
    openModal,
    closeModal,
    isFormModalOpen,
    fillForm,
    onDelete,
    columns,
    forceDeleteId,
    clearForceDeleteId,
    form: Form,
}) => {
    const {t} = i18n.useTranslation();
    const [editMode, setEditMode] = useState(false);

    const openFormModal = () => openModal(modalFormName(typeName));
    const closeFormModal = () => closeModal(modalFormName(typeName));
    const onEdit = (row) => {
        openFormModal();
        fillForm(row.get("id"), row.get("name"), row.get("description"), row.get("technologies"), row.get("exportName"));
        setEditMode(true);
    };
    const onCreate = () => {
        openFormModal();
        fillForm();
        setEditMode(false);
    };

    return (
        <>
            <Data
                tableId={`table-${typeName}`}
                title={title}
                columns={columns}
                data={data}
                loading={loading}
                onCreate={onCreate}
                onEdit={onEdit}
                onDelete={(row) => onDelete(row.get("id"), false)}
                quickSearchByDataFields={data.size > 0 ? SEARCH_TABLE_FIELDS : undefined}
                searchPlaceholder={t("search.placeholder")}
            />
            <Modal
                open={isFormModalOpen}
                onClose={closeFormModal}
            >
                <Form editMode={editMode} onClose={closeFormModal} />
            </Modal>
            <Confirmation
                title={t(`force.delete.button.label`)}
                text={t(`force.delete.confirmation.text`)}
                onDelete={() => onDelete(forceDeleteId, true)}
                onClose={clearForceDeleteId}
                open={!!forceDeleteId}
            />
        </>
    );
};

DataTable.propTypes = {
    data: IPropTypes.listOf(Type).isRequired,
    columns: columnsPropTypes,
    form: PropTypes.oneOfType([PropTypes.object, PropTypes.func]).isRequired,
    // Prop for mapStateToProps function
    // eslint-disable-next-line react/no-unused-prop-types
    typeName: PropTypes.oneOf(types.availableTypesArray).isRequired,
    title: PropTypes.string.isRequired,
    openModal: PropTypes.func.isRequired,
    closeModal: PropTypes.func.isRequired,
    isFormModalOpen: PropTypes.bool.isRequired,
    fillForm: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    loading: PropTypes.bool,
    forceDeleteId: PropTypes.number,
    clearForceDeleteId: PropTypes.func.isRequired,
};

DataTable.defaultProps = {
    loading: false,
    columns: defaultColumns,
    forceDeleteId: undefined,
};

const mapStateToProps = (state, {typeName}) => ({
    data: types.getType(state, typeName),
    forceDeleteId: forceDeleteConfirmationId(state, typeName),
    isFormModalOpen: modal.isOpen(state, modalFormName(typeName)),
});

const mapDispatchToProps = (dispatch, {typeName}) => {
    const actions = createTypeActionGroup(typeName);
    return ({
        openModal: (modalName) => dispatch(modal.open(modalName)),
        closeModal: (modalName) => dispatch(modal.close(modalName)),
        fillForm: (id, name, description, technologies, exportName) => dispatch(actions.fill(id, name, description, technologies, exportName)),
        onDelete: (id, force) => dispatch(actions.remove(id, force)),
        clearForceDeleteId: () => dispatch(actions.forceDeleteConfirmation(0)),
    });
};

export default connect(mapStateToProps, mapDispatchToProps)(DataTable);
