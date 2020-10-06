import React from "react";
import {connect} from "react-redux";
import PropTypes from 'prop-types';
import IPropTypes from "react-immutable-proptypes";

import {compose} from "core/form";
import modal from "core/modal";
import {accesses} from "core/access";
import {Card, CardLayout, Modal} from "components";
import {Certificate} from "app/model/cv";

import {getOthers} from "./selectors";
import {
    removeOtherFromCv as removeOtherFromCvAction,
    fillForm as fillFormAction,
    openForm as openFormAction,
    closeForm as closeFormAction,
} from "./actions";
import {MODAL_NAME} from "./constants";
import Form from "./Form";
import {useAccessOrIsOwner} from "../utils";

const Container = ({
    others,
    isFormOpen,
    openForm,
    closeForm,
    fillForm,
    removeOtherFromCv,
}) => {
    const adminOrOwnerAccess = useAccessOrIsOwner([accesses.admin]);

    const onEdit = ({id, name, date, description}) => {
        fillForm(id, name, date, description);
        openForm();
    };
    return (
        <>
            <Modal
                open={isFormOpen}
                onClose={closeForm}
            >
                <Form onClose={closeForm} />
            </Modal>
            {others.size > 0
            && (
                <CardLayout title="Others">
                    {others.map((other) => (
                        <Card
                            key={other.id}
                            title={other.name}
                            onEdit={adminOrOwnerAccess(() => onEdit(other))}
                            onDelete={adminOrOwnerAccess(() => removeOtherFromCv(other.id))}
                            date={other.date}
                        >
                            {other.description}
                        </Card>
                    ))}
                </CardLayout>
            )}
        </>
    );
};

const mapStateToProps = (state) => ({
    others: getOthers(state),
    isFormOpen: modal.isOpen(state, MODAL_NAME),
});

const mapDispatchToProps = ({
    openForm: openFormAction,
    closeForm: closeFormAction,
    fillForm: fillFormAction,
    removeOtherFromCv: removeOtherFromCvAction,
});

Container.propTypes = {
    others: IPropTypes.listOf(Certificate).isRequired,
    isFormOpen: PropTypes.bool.isRequired,
    openForm: PropTypes.func.isRequired,
    closeForm: PropTypes.func.isRequired,
    fillForm: PropTypes.func.isRequired,
    removeOtherFromCv: PropTypes.func.isRequired,
};

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
)(Container);
