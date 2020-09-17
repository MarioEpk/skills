import {NAME, types} from "./constants";
import reducer from "./reducer";
import Container from "./Container";
import {show} from "./actions";

const notification = {
    NAME,
    reducer,
    show,
    Container,
    types,
};

export default notification;
