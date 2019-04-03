import InputIcon from '@material-ui/icons/Input';
import * as React from 'react';
import { IconProps } from './IconProps';
import IconStylesTemplate from './IconStylesTemplate';

const SignoutIcon = ({activate}: IconProps) => {
    return (
        <InputIcon onClick={activate}/>
    );
};


export default IconStylesTemplate(SignoutIcon);

