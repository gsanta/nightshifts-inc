import InputIcon from '@material-ui/icons/Input';
import * as React from 'react';
import { IconProps } from './IconProps';
import IconStylesTemplate from './IconStylesTemplate';
import Tooltip from '@material-ui/core/Tooltip';

const SignoutIcon = ({activate, className}: IconProps) => {
    return (
        <Tooltip title="Signout" className={className}>
            <InputIcon onClick={activate}/>
        </Tooltip>
    );
};


export default IconStylesTemplate(SignoutIcon);

