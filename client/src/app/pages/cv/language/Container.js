import React from "react";
import {connect} from "react-redux";
import PropTypes from 'prop-types';
import IPropTypes from "react-immutable-proptypes";

import {compose, Slider} from "core/form";
import {Card, CardLayout} from "components";
import {Language} from "app/model/cv";
import {getLanguages} from "./selectors";
import {removeLanguageFromCv, updateLanguage as updateLanguageAction} from "./actions";

const Container = ({languages, removeLanguage, updateLanguage}) => (
    languages.size > 0
    && (
        <CardLayout title="Jazyky">
            {languages.map((language) => (
                <Card
                    key={language.id}
                    title={language.languageType.name}
                    onDelete={() => removeLanguage(language.id)}
                >
                    <Slider value={language.level} onChange={(value) => updateLanguage(language.id, value)} />
                </Card>
            ))}
        </CardLayout>
    )

);

const mapStateToProps = (state) => ({
    languages: getLanguages(state),
});

const mapDispatchToProps = ({
    removeLanguage: removeLanguageFromCv,
    updateLanguage: updateLanguageAction,
});

Container.propTypes = {
    languages: IPropTypes.listOf(Language).isRequired,
    removeLanguage: PropTypes.func.isRequired,
    updateLanguage: PropTypes.func.isRequired,
};

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
)(Container);
