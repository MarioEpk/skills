import React from "react";
import {connect} from "react-redux";
import PropTypes from 'prop-types';
import IPropTypes from "react-immutable-proptypes";

import {compose} from "core/form";
import modal from "core/modal";
import {accesses} from "core/access";
import i18n from "core/i18n";
import {Card, CardLayout, Modal} from "components";
import {Education} from "app/model/cv";

import {getEducations} from "./selectors";
import {
    removeEducationFromCv as removeEducationFromCvAction,
    fillForm as fillFormAction,
    openForm as openFormAction,
    closeForm as closeFormAction,
} from "./actions";
import {MODAL_NAME} from "./constants";
import Form from "./Form";
import {useAccessOrIsOwner} from "../utils";

const Container = ({
    educations,
    isFormOpen,
    openForm,
    closeForm,
    fillForm,
    removeEducationFromCv,
}) => {
    const {t} = i18n.useTranslation();
    const adminOrOwnerAccess = useAccessOrIsOwner([accesses.admin]);

    const onEdit = ({id, school, field, yearFrom, yearTo, note}) => {
        fillForm(id, school, field, yearFrom, yearTo, note);
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
            {educations.size > 0
            && (
                <CardLayout title={t("educations.title")}>
                    {educations.map((education) => (
                        <Card
                            key={education.id}
                            title={education.school}
                            secondTitle={education.field}
                            onEdit={adminOrOwnerAccess(() => onEdit(education))}
                            onDelete={adminOrOwnerAccess(() => removeEducationFromCv(education.id))}
                            date={`${education.yearFrom} > ${education.yearTo}`}
                        >
                            {education.note}
                        </Card>
                    ))}
                </CardLayout>
            )}
        </>
    );
};

const mapStateToProps = (state) => ({
    educations: getEducations(state),
    isFormOpen: modal.isOpen(state, MODAL_NAME),
});

const mapDispatchToProps = ({
    openForm: openFormAction,
    closeForm: closeFormAction,
    fillForm: fillFormAction,
    removeEducationFromCv: removeEducationFromCvAction,
});

Container.propTypes = {
    educations: IPropTypes.listOf(Education).isRequired,
    isFormOpen: PropTypes.bool.isRequired,
    openForm: PropTypes.func.isRequired,
    closeForm: PropTypes.func.isRequired,
    fillForm: PropTypes.func.isRequired,
    removeEducationFromCv: PropTypes.func.isRequired,
};

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
)(Container);
