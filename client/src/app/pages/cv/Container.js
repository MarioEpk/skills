import React from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import IPropTypes from "react-immutable-proptypes";

import {PageTitle} from "app/containers";
import {accesses} from "core/access";
import {WithColumn, Menu, Button} from "components";
import {compose} from "core/form";

import language, {Language} from "./language";
import skill, {Skill} from "./skill";
import technology, {Technology} from "./technology";
import certificate, {Certificate} from "./certificate";
import other, {Other} from "./other";
import project, {Project} from "./project";
import {Form} from "./form";
import {createMenuItems, useAccessOrIsOwner} from "./utils";
import {getTypes} from "./selectors";
import {cvActionGroup} from "./actions";

const Container = ({
    types,
    addLanguageToCv,
    addSkillToCv,
    addTechnologyToCv,
    openCertificateForm,
    openOtherForm,
    openProjectForm,
    exportCv,
    usedSkillIds,
    usedLanguageIds,
    usedTechnologyIds,
}) => {
    console.log(usedSkillIds, usedLanguageIds, usedTechnologyIds);
    const adminOrOwnerAccess = useAccessOrIsOwner([accesses.admin]);
    const isAdminOrOwner = adminOrOwnerAccess(true);
    return (
        <>
            <PageTitle title={!isAdminOrOwner ? "CV" : "My CV"} />
            <WithColumn
                title={!isAdminOrOwner ? "CV" : "My CV"}
                titleButton={<Button label="Generate PDF" onClick={exportCv} />}
                column={adminOrOwnerAccess([
                    <Menu key="menu1" title="Projects" items={createMenuItems(types.projects, openProjectForm)} />,
                    <Menu key="menu2" title="Skills" items={createMenuItems(types.skills, addSkillToCv, usedSkillIds)} />,
                    <Menu key="menu3" title="Languages" items={createMenuItems(types.languages, addLanguageToCv, usedLanguageIds)} />,
                    <Menu key="menu4" title="Technologies" items={createMenuItems(types.technologies, addTechnologyToCv, usedTechnologyIds)} />,
                    <Menu key="menu5" title="Certificates" onClick={openCertificateForm} />,
                    <Menu key="menu6" title="Others" onClick={openOtherForm} />,
                ])}
            >
                <Form />
                <Project />
                <Skill />
                <Language />
                <Technology />
                <Certificate />
                <Other />
            </WithColumn>
        </>
    );
};

const mapStateToProps = (state) => ({
    types: getTypes(state),
    usedSkillIds: skill.getUsedSkillTypesId(state),
    usedLanguageIds: language.getUsedLanguageTypesId(state),
    usedTechnologyIds: technology.getUsedTechnologyTypesId(state),
});

const mapDispatchToProps = ({
    addLanguageToCv: language.addLanguageToCv,
    addSkillToCv: skill.addSkillToCv,
    addTechnologyToCv: technology.addTechnologyToCv,
    openCertificateForm: certificate.openForm,
    openOtherForm: other.openForm,
    openProjectForm: project.openForm,
    exportCv: cvActionGroup.export,
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
    exportCv: PropTypes.func.isRequired,
    usedSkillIds: IPropTypes.list.isRequired,
    usedLanguageIds: IPropTypes.list.isRequired,
    usedTechnologyIds: IPropTypes.list.isRequired,
};

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
)(Container);
