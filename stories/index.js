// -*- mode: rjsx -*-
import React from 'react';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Upload from 'material-ui-upload/Upload';
import UploadPreview from 'material-ui-upload/UploadPreview';

let theme = (v) => (
    <MuiThemeProvider muiTheme={getMuiTheme()}>
      {v}
    </MuiThemeProvider>
);

storiesOf('Button', module)
    .add(
        'Upload',
        () => theme(
            <Upload
              label="Add"
              onFileLoad={action('onFileLoad')}
              />
        )
    )
    .add(
        'UploadPreview',
        () => theme(
            <UploadPreview
              title="Picture"
              label="Add"
              initialItems={{}}
              onChange={action('UploadPreview.onChange')}
              />
        )
    );
