import React from "react";
import {connect} from "react-redux";
import PropTypes from 'prop-types';
import IPropTypes from "react-immutable-proptypes";

import {compose} from "core/form";
import {Card, CardLayout, Slider} from "components";
import {Language} from "app/model/cv";
import {getLanguages} from "./selectors";
import {removeLanguageFromCv} from "./actions";

const Container = ({languages, removeLanguage}) => (
    <CardLayout title="Jazyky">
        {languages.map((language) => (
            <Card
                key={language.id}
                title={language.languageType.name}
                onDelete={() => removeLanguage(language.id)}
            >
                <Slider onChange={(value) => console.log(value)} />
            </Card>
        ))}
    </CardLayout>
);

const mapStateToProps = (state) => ({
    languages: getLanguages(state),
});

const mapDispatchToProps = ({
    removeLanguage: removeLanguageFromCv,
});

Container.propTypes = {
    languages: IPropTypes.listOf(Language).isRequired,
    removeLanguage: PropTypes.func.isRequired,
};

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
)(Container);
