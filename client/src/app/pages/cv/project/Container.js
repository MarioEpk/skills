import React from "react";
import {connect} from "react-redux";
import PropTypes from 'prop-types';
import IPropTypes from "react-immutable-proptypes";

import {compose} from "core/form";
import modal from "core/modal";
import {Card, CardLayout, Modal} from "components";
import {Project} from "app/model/cv";
import {Type, Project as ProjectType} from "app/model/type";
import {accesses} from "core/access";
import {getProjects} from "./selectors";
import {
    removeProjectFromCv as removeProjectFromCvAction,
    fillForm as fillFormAction,
    openForm as openFormAction,
    closeForm as closeFormAction,
} from "./actions";
import {MODAL_NAME} from "./constants";
import Form from "./Form";
import {getTypePositions, getTypeProjects, getTypeTechnologies} from "../selectors";
import {useAccessOrIsOwner} from "../utils";

const Container = ({
    projects,
    isFormOpen,
    openForm,
    closeForm,
    fillForm,
    removeProjectFromCv,
    positions,
    projectTypes,
    technologies,
}) => {
    const adminOrOwnerAccess = useAccessOrIsOwner([accesses.admin]);

    const onEdit = ({id, from, to, company, contribution, positions: positionTypes, projectType, technologies: technologyTypes}) => {
        fillForm(id, from, to, company, contribution, positionTypes, technologyTypes);
        openForm(projectType.id);
    };
    return (
        <>
            <Modal
                open={isFormOpen}
                onClose={closeForm}
            >
                <Form onClose={closeForm} positions={positions} projectTypes={projectTypes} technologies={technologies} />
            </Modal>
            {projects.size > 0
            && (
                <CardLayout title="Project">
                    {projects.map((project) => (
                        <Card
                            key={project.id}
                            title={project.projectType.name}
                            secondTitle={project.positions.map(({name}) => name).join(", ")}
                            onEdit={adminOrOwnerAccess(() => onEdit(project))}
                            onDelete={adminOrOwnerAccess(() => removeProjectFromCv(project.id))}
                            date={`${project.from} > ${project.to || "Stále probíhá"}`}
                        />
                    ))}
                </CardLayout>
            )}
        </>
    );
};

const mapStateToProps = (state) => ({
    projects: getProjects(state),
    positions: getTypePositions(state),
    technologies: getTypeTechnologies(state),
    isFormOpen: modal.isOpen(state, MODAL_NAME),
    projectTypes: getTypeProjects(state),
});

const mapDispatchToProps = ({
    openForm: openFormAction,
    closeForm: closeFormAction,
    fillForm: fillFormAction,
    removeProjectFromCv: removeProjectFromCvAction,
});

Container.propTypes = {
    projects: IPropTypes.listOf(Project).isRequired,
    isFormOpen: PropTypes.bool.isRequired,
    openForm: PropTypes.func.isRequired,
    closeForm: PropTypes.func.isRequired,
    fillForm: PropTypes.func.isRequired,
    removeProjectFromCv: PropTypes.func.isRequired,
    positions: IPropTypes.listOf(Type).isRequired,
    technologies: IPropTypes.listOf(Type).isRequired,
    projectTypes: IPropTypes.listOf(ProjectType).isRequired,
};

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
)(Container);
