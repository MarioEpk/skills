import {NAME} from './constants';
import Container from './Container';
import saga from './saga';
import reducer from './reducer';

export {copyCVPublicUrlToClipboard, copyCVPrivateUrlToClipboard} from './utils';

export default {
    NAME,
    Container,
    saga,
    reducer,
};
