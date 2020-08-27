import {model} from "core/util";

export const UserByGoogle = model.createModel("UserByGoogle", (json) => ({
    email: json.email,
    familyName: json.familyName,
    givenName: json.givenName,
    googleId: json.googleId,
    imageUrl: json.imageUrl,
}));
