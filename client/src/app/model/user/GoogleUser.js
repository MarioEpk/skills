import {model} from "core/util";

export const GoogleUser = model.createModel("GoogleUser", (json) => ({
    email: json.email,
    firstName: json.givenName,
    lastName: json.familyName,
    googleId: json.googleId,
    imageUrl: json.imageUrl,
}));
