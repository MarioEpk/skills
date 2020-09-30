import {model} from "core/util";
import {Role} from "./Role";

export const User = model.createModel("User", (json) => ({
    id: json.id,
    email: json.email,
    firstName: json.firstName,
    lastName: json.lastName,
    googleId: json.googleId,
    imageUrl: json.imageUrl,
    role: Role.fromServer(json.role),
}));
