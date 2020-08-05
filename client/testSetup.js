import "core-js/stable";
import "regenerator-runtime/runtime";

import enzyme from 'enzyme';
import ReactAdapter from 'enzyme-adapter-react-16';
import chai from 'chai';
import chaiImmutable from 'chai-immutable';
import chaiSinon from 'sinon-chai';
import dirtyChai from 'dirty-chai';
import chaiEnzyme from 'chai-enzyme';

enzyme.configure({adapter: new ReactAdapter()});

chai.use(chaiImmutable);
chai.use(chaiEnzyme());
chai.use(dirtyChai);
chai.use(chaiSinon);
