import React from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import IPropTypes from "react-immutable-proptypes";

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faFileWord, faFilePdf} from '@fortawesome/free-regular-svg-icons';
import {faArrowUpRightFromSquare, faLink} from "@fortawesome/free-solid-svg-icons";

import {PageTitle} from "app/containers";
import {accesses} from "core/access";
import {WithColumn, Menu, IconButton, Flex} from "components";
import {compose} from "core/form";
import i18n from "core/i18n";
import coreTypes from "core/types";

import language, {Language} from "./language";
import skill, {Skill} from "./skill";
import technology, {Technology} from "./technology";
import certificate, {Certificate} from "./certificate";
import other, {Other} from "./other";
import project, {Project} from "./project";
import education, {Education} from "./education";
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
    openEducationForm,
    openProjectForm,
    exportCv,
    usedSkillIds,
    usedLanguageIds,
    usedTechnologyIds,
    exportCvToDoc,
    copyCvUrl,
    copyCvPublicUrl,
}) => {
    const adminOrOwnerAccess = useAccessOrIsOwner([accesses.admin]);
    const isAdminOrOwner = adminOrOwnerAccess(true);
    const {t} = i18n.useTranslation();
    const title = isAdminOrOwner ? t('cv.my.title') : t('cv.title');

    return (
        <>
            <PageTitle title={title} />
            <WithColumn
                title={title}
                actions={(
                    <Flex>
                        <IconButton icon={<FontAwesomeIcon icon={faFilePdf} />} onClick={exportCv} ariaLabel={t(`cv.generate.pdf.label`)} />
                        <IconButton icon={<FontAwesomeIcon icon={faFileWord} />} onClick={exportCvToDoc} ariaLabel={t(`cv.generate.doc.label`)} />
                        <IconButton icon={<FontAwesomeIcon icon={faLink} />} onClick={copyCvUrl} ariaLabel={t(`cv.copy.link.label`)} />
                        <IconButton icon={<FontAwesomeIcon icon={faArrowUpRightFromSquare} />} onClick={copyCvPublicUrl} ariaLabel={t(`cv.copy.public.link.label`)} />
                    </Flex>
                )}
                column={adminOrOwnerAccess([
                    <Menu key="menu1" title={t(`projects.title`)} items={createMenuItems(types.getIn([coreTypes.availableTypes.PROJECT, "data"]), openProjectForm)} />,
                    <Menu key="menu2" title={t(`skills.title`)} items={createMenuItems(types.getIn([coreTypes.availableTypes.SKILL, "data"]), addSkillToCv, usedSkillIds)} />,
                    <Menu key="menu3" title={t(`languages.title`)} items={createMenuItems(types.getIn([coreTypes.availableTypes.LANGUAGE, "data"]), addLanguageToCv, usedLanguageIds)} />,
                    <Menu key="menu4" title={t(`technologies.title`)} items={createMenuItems(types.getIn([coreTypes.availableTypes.TECHNOLOGY, "data"]), addTechnologyToCv, usedTechnologyIds)} />,
                    <Menu key="menu5" title={t('educations.title')} onClick={openEducationForm} />,
                    <Menu key="menu6" title={t(`certificates.title`)} onClick={openCertificateForm} />,
                    <Menu key="menu7" title={t(`others.title`)} onClick={openOtherForm} />,
                ])}
            >
                <Form />
                <Project />
                <Skill />
                <Language />
                <Technology />
                <Certificate />
                <Other />
                <Education />
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
    openEducationForm: education.openForm,
    openProjectForm: project.openForm,
    exportCv: cvActionGroup.export,
    exportCvToDoc: cvActionGroup.exportToDoc,
    copyCvUrl: cvActionGroup.copyUrl,
    copyCvPublicUrl: cvActionGroup.copyPublicUrl,
});

Container.propTypes = {
    // TODO :: Model propType
    types: IPropTypes.map.isRequired,
    addLanguageToCv: PropTypes.func.isRequired,
    addSkillToCv: PropTypes.func.isRequired,
    addTechnologyToCv: PropTypes.func.isRequired,
    openCertificateForm: PropTypes.func.isRequired,
    openOtherForm: PropTypes.func.isRequired,
    openEducationForm: PropTypes.func.isRequired,
    openProjectForm: PropTypes.func.isRequired,
    exportCv: PropTypes.func.isRequired,
    usedSkillIds: IPropTypes.list.isRequired,
    usedLanguageIds: IPropTypes.list.isRequired,
    usedTechnologyIds: IPropTypes.list.isRequired,
    exportCvToDoc: PropTypes.func.isRequired,
    copyCvUrl: PropTypes.func.isRequired,
    copyCvPublicUrl: PropTypes.func.isRequired,
};

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
)(Container);
