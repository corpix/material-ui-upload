// -*- mode: rjsx -*-
import React from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import {mount} from 'enzyme';
import {assert} from 'chai';
import PropTypes from 'prop-types';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import UploadPreview from './index';


const mountWithTheme = (node) => mount(
    node,
    {
        context: {muiTheme: getMuiTheme()},
        childContextTypes: {muiTheme: PropTypes.object}
    }
);

describe('UploadPreview', () => {
    const newUploadPreview = (props = {}) => mountWithTheme(
            <UploadPreview {...props}/>
    );

    it(
        'always renders a div',
        () => {
            const nodes = newUploadPreview().find('> div');
            assert.equal(nodes.length, 1);
        }
    );
});
