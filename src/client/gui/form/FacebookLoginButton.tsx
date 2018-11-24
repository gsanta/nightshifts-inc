import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import styled from 'styled-components';
import * as React from 'react';

const ButtonStyled = styled.button`
    height: 60px;
    width: 100%;
    margin-top: 10px;
    background: #4567B0;
    color: white;
    text-transform: uppercase;
    cursor: pointer;
`;

export const FacebookLoginButton = (props: FacebookLoginButtonProps) => {
    return (
        <FacebookLogin
            appId="1908610379223081"
            autoLoad={true}
            fields="name,email,picture"
            callback={props.callback}
            render={renderProps => (
                <ButtonStyled onClick={renderProps.onClick}>{props.text}</ButtonStyled>
            )}
        />
    );
};

export interface FacebookLoginButtonProps {
    callback(event: {accessToken: string}): void;
    text: string;
}
