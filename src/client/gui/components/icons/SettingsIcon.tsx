import SettingsIcon from '@material-ui/icons/Settings';
import * as React from 'react';
import { IconProps } from './IconProps';

const Settings = ({activate}: IconProps) => {
    return (
        <SettingsIcon onClick={activate}/>
    );
};

export default Settings;
