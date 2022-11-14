import React from "react";
import {connect} from "react-redux";
import PropTypes from 'prop-types';
import IPropTypes from "react-immutable-proptypes";

import i18n from "core/i18n";
import {compose} from "core/form";
import modal from "core/modal";
import {accesses} from "core/access";
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
import {useAccessOrIsOwner} from "../utils";

const Container = ({
    certificates,
    isFormOpen,
    openForm,
    closeForm,
    fillForm,
    removeCertificateFromCv,
}) => {
    const adminOrOwnerAccess = useAccessOrIsOwner([accesses.admin]);
    const onEdit = ({id, name, date, description}) => {
        fillForm(id, name, date, description);
        openForm();
    };
    const {t} = i18n.useTranslation();

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
                <CardLayout title={t(`certificates.title`)}>
                    {certificates.map((certificate) => (
                        <Card
                            key={certificate.id}
                            title={certificate.name}
                            onEdit={adminOrOwnerAccess(() => onEdit(certificate))}
                            onDelete={adminOrOwnerAccess(() => removeCertificateFromCv(certificate.id))}
                            date={certificate.date}
                        >
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
