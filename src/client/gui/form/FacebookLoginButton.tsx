import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import styled from 'styled-components';
import * as React from 'react';
import Button from '../components/form_elements/Button';

export const FacebookLoginButton = (props: FacebookLoginButtonProps) => {
    return (
        <FacebookLogin
            appId="1908610379223081"
            autoLoad={true}
            fields="name,email,picture"
            callback={props.callback}
            render={renderProps => (
                <Button label="Facebook" onClick={renderProps.onClick} className={props.className}/>
            )}
        />
    );
};

export interface FacebookLoginButtonProps {
    callback(event: {accessToken: string}): void;
    className?: string;
}
