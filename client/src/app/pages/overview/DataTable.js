import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import IPropTypes from "react-immutable-proptypes";
import {Edit, GetApp} from "@material-ui/icons";

import modal from "core/modal";
import {Type} from "app/model/type";
import access, {accesses} from "core/access";
import {Button, Data, Modal} from "components";
import {MODAL_FORM_NAME, SEARCH_TABLE_FIELD} from "./constants";
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
    columnName: "Jméno",
}, {
    key: "3",
    dataField: "user.lastName",
    columnName: "Příjmení",
}, {
    key: "4",
    dataField: "updatedAt",
    columnName: "Aktualizováno",
}];

const DataTable = ({
    data,
    loading,
    openModal,
    closeModal,
    isFormModalOpen,
    onDelete,
}) => {
    const onCustomAction = (row) => ([
        <Button key="redirect" href={`/${row.get("id")}`} label="Editovat" startIcon={<Edit />} />,
        <Button key="export" onClick={() => console.log("export", row)} label="Exportovat" startIcon={<GetApp />} />,
    ]);
    const onCreate = () => {
        openModal();
    };

    const adminAccess = access.useAccess([accesses.admin]);

    return (
        <>
            <Data
                title="Životopisy"
                columns={columns}
                data={data}
                loading={loading}
                onCreate={adminAccess(onCreate)}
                onCustomAction={onCustomAction}
                onDelete={adminAccess((row) => onDelete(row.get("id")))}
                searchByDataField={data.size > 0 ? SEARCH_TABLE_FIELD : undefined}
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
});

export default connect(mapStateToProps, mapDispatchToProps)(DataTable);
