import React from "react";
import {connect} from "react-redux";
import PropTypes from 'prop-types';
import IPropTypes from "react-immutable-proptypes";

import {compose} from "core/form";
import modal from "core/modal";
import {Card, CardLayout, Modal} from "components";
import {Certificate} from "app/model/cv";
import {getCertificates} from "./selectors";
import {
    removeCertificateFromCv as removeCertificateFromCvAction,
    fillForm as fillFormAction,
    openForm as openFormAction,
    closeForm as closeFormAction,
} from "./actions";
import {MODAL_NAME} from "./constants";
import Form from "./Form";

const Container = ({
    certificates,
    isFormOpen,
    openForm,
    closeForm,
    fillForm,
    removeCertificateFromCv,
}) => {
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
            {certificates.size > 0
            && (
                <CardLayout title="Certifikáty">
                    {certificates.map((certificate) => (
                        <Card
                            key={certificate.id}
                            title={certificate.name}
                            onEdit={() => onEdit(certificate)}
                            onDelete={() => removeCertificateFromCv(certificate.id)}
                        >
                            {certificate.date}
                            {certificate.description}
                        </Card>
                    ))}
                </CardLayout>
            )}
        </>
    );
};

const mapStateToProps = (state) => ({
    certificates: getCertificates(state),
    isFormOpen: modal.isOpen(state, MODAL_NAME),
});

const mapDispatchToProps = ({
    openForm: openFormAction,
    closeForm: closeFormAction,
    fillForm: fillFormAction,
    removeCertificateFromCv: removeCertificateFromCvAction,
});

Container.propTypes = {
    certificates: IPropTypes.listOf(Certificate).isRequired,
    isFormOpen: PropTypes.bool.isRequired,
    openForm: PropTypes.func.isRequired,
    closeForm: PropTypes.func.isRequired,
    fillForm: PropTypes.func.isRequired,
    removeCertificateFromCv: PropTypes.func.isRequired,
};

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
)(Container);
