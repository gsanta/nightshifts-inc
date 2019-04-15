import { storiesOf } from '@storybook/react';
import * as React from 'react';
import ApplicationSettingsDialog from './ApplicationSettingsDialog';

storiesOf('ApplicationSettingsDialog', module)
    .add('basic dialog', () => (
        <ApplicationSettingsDialog/>
    ));