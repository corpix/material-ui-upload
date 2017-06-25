// -*- mode: rjsx -*-
import React from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import {mount} from 'enzyme';
import {assert} from 'chai';
import PropTypes from 'prop-types';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Upload from './index';


const mountWithTheme = (node) => mount(
    node,
    {
        context: {muiTheme: getMuiTheme()},
        childContextTypes: {muiTheme: PropTypes.object}
    }
);

describe('Upload', () => {
    const newUpload = (props = {}) => mountWithTheme(
        <Upload {...props}/>
    );

    it(
        'always renders an input',
        () => {
            const nodes = newUpload().find('input');
            assert.equal(nodes.length, 1);
        }
    );
});
