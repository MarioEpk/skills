import React from "react";
import {connect} from "react-redux";
import PropTypes from 'prop-types';
import IPropTypes from "react-immutable-proptypes";

import {compose} from "core/form";
import {Card, CardLayout, Slider} from "components";
import {Skill} from "app/model/cv";
import {getSkills} from "./selectors";
import {removeSkillFromCv, updateSkill as updateSkillAction} from "./actions";

const Container = ({skills, removeSkill, updateSkill}) => (
    skills.size > 0
    && (
        <CardLayout title="Schopnosti">
            {skills.map((skill) => (
                <Card
                    key={skill.id}
                    title={skill.skillType.name}
                    onDelete={() => removeSkill(skill.id)}
                >
                    <Slider value={skill.level} onChange={(value) => updateSkill(skill.id, value)} />
                </Card>
            ))}
        </CardLayout>
    )

);

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
