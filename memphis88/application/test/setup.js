import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import rewire from 'rewire';
import Constants from '../app/dispatcher/constants';

chai.should();
chai.use(sinonChai);

global.expect = chai.expect;
global.sinon = sinon;
global.rewire = rewire;
global.Constants = Constants;