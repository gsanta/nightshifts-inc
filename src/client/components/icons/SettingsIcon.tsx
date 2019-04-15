import SettingsIcon from '@material-ui/icons/Settings';
import * as React from 'react';
import { IconProps } from './IconProps';
import { Tooltip } from '@material-ui/core';
import IconStylesTemplate from './IconStylesTemplate';
import { Link } from 'react-router-dom';

const Settings = ({activate, className}: IconProps) => {
    return (
        <Link to="/settings" className={className}>
            <Tooltip title="Settings">
                <SettingsIcon onClick={activate}/>
            </Tooltip>
        </Link>
    );
};

export default IconStylesTemplate(Settings);
