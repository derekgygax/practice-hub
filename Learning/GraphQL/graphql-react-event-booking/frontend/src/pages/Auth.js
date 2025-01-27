import React, { useState, useContext } from 'react'
import { useLazyQuery, useMutation, gql } from '@apollo/client';

import { AuthContext } from '../context/auth-context';

import './Auth.css';

const LOGIN = gql`
  query Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      userId
      token
      tokenExpiration
    }
  }
`;

const CREATE_USER = gql`
  mutation CreateUser($userInput: UserInput!) {
    createUser(userInput: $userInput) {
      _id,
      email
    }
  }
`;

export const AuthPage = () => {

  const authContext = useContext(AuthContext);


  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isLogin, setIsLogin] = useState(true);

  const [getLoginData, { loading: loginLoading, error: loginError }] = useLazyQuery(LOGIN);
  const [createUser, { loading: createUserLoading, error: createUserError, reset }] = useMutation(CREATE_USER);


  const switchModeHander = () => {
    setIsLogin((prevIsLogin) => !prevIsLogin);
  }

  const submitHandler = async (e) => {
    // so the page doesn't chage
    e.preventDefault();


    if (email.trim().length === 0 || password.trim().length === 0) {
      return;
    }

    if (isLogin) {

      try {
        const { data: { login: { userId, token, tokenExpiration } } } = await getLoginData({
          variables: {
            email: email,
            password: password
          }
        });

        authContext.login(
          userId,
          token,
          tokenExpiration
        );

      } catch (err) {
        console.log('error: ', err);
      }



    } else {
      try {
        const { data: { createUser: userCreated } } = await createUser({
          variables: {
            userInput: {
              email: email,
              password: password
            }
          }
        });

        // Reset the stuff help in the apollo function
        // reset();

      } catch (err) {
        // This is where it goes if the user was already created!!!
        // This is where it goes if the user was already created!!!
        // This is where it goes if the user was already created!!!
        console.log('err', err);
      }
    }
  }

  return (
    <form
      className='auth-form'
      onSubmit={(e) => {
        submitHandler(e);
      }}
    >
      <div className='form-control'>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value)
          }}
        />
      </div>
      <div className='form-control'>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value)
          }}
        />
      </div>
      <div className='form-actions'>
        <button type="submit">Submit</button>
        <button type="button" onClick={switchModeHander}>Switch to {isLogin ? 'Sign Up' : 'Login'}</button>
      </div>
    </form>
  )
}
