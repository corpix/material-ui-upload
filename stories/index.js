// -*- mode: rjsx -*-
import React from 'react';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import Upload from 'material-ui-upload/Upload';
import UploadPreview from 'material-ui-upload/UploadPreview';

let theme = (v) => (
    <MuiThemeProvider muiTheme={getMuiTheme()}>
      {v}
    </MuiThemeProvider>
);

storiesOf('Upload', module)
    .add(
        'Default button',
        () => theme(
            <Upload
              label="Add"
              onFileLoad={action('onFileLoad')}
              />
        )
    )
    .add(
        'RaisedButton',
        () => theme(
            <Upload
              label="Add"
              onFileLoad={action('onFileLoad')}
              buttonControl={RaisedButton}
              />
        )
    )
;

storiesOf('UploadPreview', module)
    .add(
        'Default button',
        () => theme(
            <UploadPreview
              title="Picture"
              label="Add"
              initialItems={{}}
              onChange={action('UploadPreview.onChange')}
              />
        )
    )
    .add(
        'RaisedButton',
        () => theme(
            <UploadPreview
              title="Picture"
              label="Add"
              buttonControl={RaisedButton}
              initialItems={{}}
              onChange={action('UploadPreview.onChange')}
              />
        )
    )
;
