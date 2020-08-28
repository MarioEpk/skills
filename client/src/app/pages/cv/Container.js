import React from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import IPropTypes from "react-immutable-proptypes";

import {PageTitle} from "app/containers";
import {WithColumn, Menu} from "components";
import {compose} from "core/form";
import language, {Language} from "./language";
import skill, {Skill} from "./skill";
import technology, {Technology} from "./technology";
import certificate, {Certificate} from "./certificate";
import other, {Other} from "./other";
import project, {Project} from "./project";
import {Form} from "./form";
import {createMenuItems} from "./utils";
import {getTypes} from "./selectors";

const Container = ({
    types, addLanguageToCv, addSkillToCv, addTechnologyToCv, openCertificateForm, openOtherForm, openProjectForm,
}) => (
    <>
        <PageTitle title="Můj životopis" />
        <WithColumn
            title="Můj životopis"
            column={[
                <Menu key="menu1" title="Projekty" items={createMenuItems(types.projects, openProjectForm)} />,
                <Menu key="menu2" title="Schopnosti" items={createMenuItems(types.skills, addSkillToCv)} />,
                <Menu key="menu3" title="Jazyky" items={createMenuItems(types.languages, addLanguageToCv)} />,
                <Menu key="menu4" title="Technologie" items={createMenuItems(types.technologies, addTechnologyToCv)} />,
                <Menu key="menu5" title="Certifikáty" onClick={openCertificateForm} />,
                <Menu key="menu6" title="Ostatní" onClick={openOtherForm} />,
            ]}
        >
            <Form positions={types.positions} />
            <Project positions={types.positions} projectTypes={types.projects} />
            <Skill />
            <Language />
            <Technology />
            <Certificate />
            <Other />
        </WithColumn>
    </>
);

const mapStateToProps = (state) => ({
    types: getTypes(state),
});

const mapDispatchToProps = ({
    addLanguageToCv: language.addLanguageToCv,
    addSkillToCv: skill.addSkillToCv,
    addTechnologyToCv: technology.addTechnologyToCv,
    openCertificateForm: certificate.openForm,
    openOtherForm: other.openForm,
    openProjectForm: project.openForm,
});

Container.propTypes = {
    // TODO :: Model propType
    types: IPropTypes.record.isRequired,
    addLanguageToCv: PropTypes.func.isRequired,
    addSkillToCv: PropTypes.func.isRequired,
    addTechnologyToCv: PropTypes.func.isRequired,
    openCertificateForm: PropTypes.func.isRequired,
    openOtherForm: PropTypes.func.isRequired,
    openProjectForm: PropTypes.func.isRequired,
};

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
)(Container);
