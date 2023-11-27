import React from "react";
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN } from '../utils/mutations';
import Auth from '../utils/auth';
import ReactDOM from "react-dom";
import * as Components from "../components/Components";
import "./signup.css"

function SignLogin() {
  const [signIn, toggle] = React.useState(true);
//back code
const [formState, setFormState] = useState({ email: '', password: '' });
const [login, { error }] = useMutation(LOGIN);

const handleFormSubmit = async (event) => {
  event.preventDefault();
  try {
    const mutationResponse = await login({
      variables: { email: formState.email, password: formState.password },
    });
    const token = mutationResponse.data.login.token;
    Auth.login(token);
  } catch (e) {
    console.log(e);
  }
};

const handleChange = (event) => {
  const { type, value } = event.target;
  setFormState({
    ...formState,
    [type]: value,
  });
};
//back code 

  return (
    <Components.Container>
    <Components.SignUpContainer signingIn={signIn}>
      <Components.Form>
        <Components.Title>Create Account</Components.Title>
        <Components.Input type="text" placeholder="Name" name="name" onChange={handleChange} />
        <Components.Input type="email" placeholder="Email" name="email" onChange={handleChange} />
        <Components.Input type="password" placeholder="Password" name="password" onChange={handleChange}/>
        <Components.Button>Sign Up</Components.Button>
      </Components.Form>
    </Components.SignUpContainer>

    <Components.SignInContainer signingIn={signIn}>
      <Components.Form onSubmit={handleFormSubmit}>
        <Components.Title>Sign in</Components.Title>
        <Components.Input type="email" placeholder="Email" />
        <Components.Input type="password" placeholder="Password" />
        <Components.Input onChange={handleChange} />
        <Components.Anchor href="#">Forgot your password?</Components.Anchor>
        <Components.Button>Sign In</Components.Button>
      </Components.Form>
    </Components.SignInContainer>
    <Components.OverlayContainer signingIn={signIn}>
      <Components.Overlay signingIn={signIn}>
        <Components.LeftOverlayPanel signingIn={signIn}>
          <Components.Title>Welcome Back!</Components.Title>
          <Components.Paragraph>
            To keep connected with us please login with your personal info
          </Components.Paragraph>
          <Components.GhostButton onClick={() => toggle(true)}>
            Sign In
          </Components.GhostButton>
        </Components.LeftOverlayPanel>

        <Components.RightOverlayPanel signingIn={signIn}>
          <Components.Title>Hello, Friend!</Components.Title>
          <Components.Paragraph>
            Enter your personal details and start journey with us
          </Components.Paragraph>
          <Components.GhostButton onClick={() => toggle(false)}>
            Sign Up
          </Components.GhostButton>
        </Components.RightOverlayPanel>
      </Components.Overlay>
    </Components.OverlayContainer>
  </Components.Container>
  );
}

export default SignLogin;



