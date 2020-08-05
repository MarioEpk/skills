import {NAME, Types} from "./constants";
import reducer from "./reducer";
import Container from "./Container";
import {show} from "./actions";

const notification = {
    NAME,
    reducer,
    show,
    Container,
    Types,
};

export default notification;
