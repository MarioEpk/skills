import React from "react";
import {connect} from "react-redux";
import PropTypes from 'prop-types';
import IPropTypes from "react-immutable-proptypes";

import {compose} from "core/form";
import {Card, CardLayout, Slider} from "components";
import {Technology} from "app/model/cv";
import {getTechnologies} from "./selectors";
import {removeTechnologyFromCv, updateTechnology as updateTechnologyAction} from "./actions";

const Container = ({technologies, removeTechnology, updateTechnology}) => (
    technologies.size > 0
    && (
        <CardLayout title="Technologie">
            {technologies.map((technology) => (
                <Card
                    key={technology.id}
                    title={technology.technologyType.name}
                    onDelete={() => removeTechnology(technology.id)}
                >
                    <Slider value={technology.level} onChange={(value) => updateTechnology(technology.id, value)} />
                </Card>
            ))}
        </CardLayout>
    )

);

const mapStateToProps = (state) => ({
    technologies: getTechnologies(state),
});

const mapDispatchToProps = ({
    removeTechnology: removeTechnologyFromCv,
    updateTechnology: updateTechnologyAction,
});

Container.propTypes = {
    technologies: IPropTypes.listOf(Technology).isRequired,
    removeTechnology: PropTypes.func.isRequired,
    updateTechnology: PropTypes.func.isRequired,
};

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
)(Container);
