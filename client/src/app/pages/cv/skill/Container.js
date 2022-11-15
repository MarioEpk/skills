import React from "react";
import {connect} from "react-redux";
import PropTypes from 'prop-types';
import IPropTypes from "react-immutable-proptypes";

import {accesses} from "core/access";
import i18n from "core/i18n";
import {compose} from "core/form";
import {Card, CardLayout, Slider} from "components";
import {Skill} from "app/model/cv";

import {getSkills} from "./selectors";
import {removeSkillFromCv, updateSkill as updateSkillAction} from "./actions";
import {useAccessOrIsOwner} from "../utils";

const Container = ({skills, removeSkill, updateSkill}) => {
    const {t} = i18n.useTranslation();
    const adminOrOwnerAccess = useAccessOrIsOwner([accesses.admin]);
    const isAdminOrOwner = adminOrOwnerAccess(true);

    return (
        skills.size > 0
        && (
            <CardLayout title={t(`skills.title`)}>
                {skills.map((skill) => (
                    <Card
                        key={skill.id}
                        title={skill.skillType.name}
                        onDelete={adminOrOwnerAccess(() => removeSkill(skill.id))}
                    >
                        <Slider
                            valueLabel={t(`skill.label.${skill.level}`)}
                            value={skill.level}
                            onChange={(value) => updateSkill(skill.id, value)}
                            disabled={!isAdminOrOwner}
                        />
                    </Card>
                ))}
            </CardLayout>
        )

    );
};

const mapStateToProps = (state) => ({
    skills: getSkills(state),
});

const mapDispatchToProps = ({
    removeSkill: removeSkillFromCv,
    updateSkill: updateSkillAction,
});

Container.propTypes = {
    skills: IPropTypes.listOf(Skill).isRequired,
    removeSkill: PropTypes.func.isRequired,
    updateSkill: PropTypes.func.isRequired,
};

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
)(Container);
