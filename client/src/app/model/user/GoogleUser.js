import {model} from "core/util";

export const GoogleUser = model.createModel("GoogleUser", (json) => ({
    email: json.email,
    firstName: json.given_name,
    lastName: json.family_name,
    googleId: json.sub,
    imageUrl: json.picture,
}));
