import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CredentialResponse, GoogleLogin } from '@react-oauth/google';
import { Authenticate } from '../externalRepository/WordRepository';

const Login = () => {

    const navigate = useNavigate();
    const authenticationFlow = async (googleResponse: CredentialResponse) => {
        await Authenticate(googleResponse.credential || '');
    }

    return (
        <div className="login-container">
            <h2>Login</h2>
            <GoogleLogin onSuccess={(googleResponse: CredentialResponse) => {
                authenticationFlow(googleResponse);
                navigate('/vocab');
            }
            }></GoogleLogin>
        </div>
    );
};

export default Login;