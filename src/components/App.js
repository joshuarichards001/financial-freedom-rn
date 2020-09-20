import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import Home from './Home';
import LoginTab from '../pages/LoginTab';
import {loginUser, registerUser, loginSocialUser} from '../helper/userAPI';
import 'react-native-gesture-handler';

export default function App() {
  console.disableYellowBox = true;
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const userToken = AsyncStorage.getItem('@storage_Key');
    userToken.then(() => {
      if (userToken._W !== null) {
        setToken(userToken._W);
        setIsLoggedIn(true);
      }
    });
  }, []);

  const onLoginClick = (userName, password) => {
    setLoading(true);
    loginUser(userName, password)
      .then(({data}) => {
        setToken(data.auth_token);
        AsyncStorage.setItem('@storage_Key', data.auth_token);
        setIsLoggedIn(true);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
        setIsLoggedIn(false);
      });
  };

  const onGoogleClick = (accessToken) => {
    setLoading(true);
    loginSocialUser(accessToken)
      .then(({data}) => {
        setToken(data.key);
        AsyncStorage.setItem('@storage_Key', data.key);
        setIsLoggedIn(true);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
        setIsLoggedIn(false);
      });
  };

  const onRegisterClick = (email, userName, password) => {
    setLoading(true);
    registerUser(email, userName, password)
      .then(() => {
        loginUser(userName, password)
          .then(({data}) => {
            setToken(data.auth_token);
            AsyncStorage.setItem('@storage_Key', data.auth_token);
            setIsLoggedIn(true);
          })
          .catch((err) => {
            setLoading(false);
            console.log(err);
            setIsLoggedIn(false);
          });
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  return (
    <>
      {isLoggedIn ? (
        <Home token={token} setIsLoggedIn={setIsLoggedIn} />
      ) : (
        <LoginTab
          onLoginClick={onLoginClick}
          onRegisterClick={onRegisterClick}
          loading={loading}
          onGoogleClick={onGoogleClick}
        />
      )}
    </>
  );
}
