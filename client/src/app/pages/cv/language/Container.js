import React from "react";
import {connect} from "react-redux";
import PropTypes from 'prop-types';
import IPropTypes from "react-immutable-proptypes";

import i18n from "core/i18n";
import {compose} from "core/form";
import {Card, CardLayout, Slider} from "components";
import {Language} from "app/model/cv";
import {accesses} from "core/access";
import {getLanguages} from "./selectors";
import {removeLanguageFromCv, updateLanguage as updateLanguageAction} from "./actions";
import {useAccessOrIsOwner} from "../utils";

const Container = ({languages, removeLanguage, updateLanguage}) => {
    const {t} = i18n.useTranslation();
    const adminOrOwnerAccess = useAccessOrIsOwner([accesses.admin]);
    const isAdminOrOwner = adminOrOwnerAccess(true);

    return (
        languages.size > 0
        && (
            <CardLayout title="Languages">
                {languages.map((language) => (
                    <Card
                        key={language.id}
                        title={language.languageType.name}
                        onDelete={adminOrOwnerAccess(() => removeLanguage(language.id))}
                    >
                        <Slider
                            valueLabel={t(`cv.language.${language.level}`)}
                            value={language.level}
                            onChange={(value) => updateLanguage(language.id, value)}
                            disabled={!isAdminOrOwner}
                        />
                    </Card>
                ))}
            </CardLayout>
        )

    );
};

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
