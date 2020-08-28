import React from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";

import {RadioGroupInput} from "components";
import {Field, getFormFieldValue, required} from "core/form";

import avatarMen from 'resources/images/avatar_man.png';
import avatarGhost from 'resources/images/avatar_ghost.png';
import avatarWoman from 'resources/images/avatar_woman.png';
import {FORM_NAME, AVATAR_FIELD, avatarType} from "./constants";

const getSrcForImage = (avatar) => {
    switch (avatar) {
        case avatarType.MEN: return avatarMen;
        case avatarType.WOMAN: return avatarWoman;
        default: return avatarGhost;
    }
};

const AvatarImage = ({avatar}) => (
    <>
        <Field
            key={`key-${AVATAR_FIELD}`}
            component={RadioGroupInput}
            placeholder="Příjmení"
            name={AVATAR_FIELD}
            validate={[required]}
            label="Avatar"
            options={[{
                value: avatarType.MEN,
                label: "Muž",
            }, {
                value: avatarType.WOMAN,
                label: "Žena",
            }]}
        />
        <img src={getSrcForImage(avatar)} alt="avatar" />
    </>
);

AvatarImage.propTypes = {
    avatar: PropTypes.oneOf(Object.values(avatarType)),
};

AvatarImage.defaultProps = {
    avatar: null,
};

const mapStateToProps = (state) => ({
    avatar: getFormFieldValue(state, FORM_NAME, AVATAR_FIELD),
});

export default connect(mapStateToProps)(AvatarImage);
