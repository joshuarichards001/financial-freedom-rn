import axios from 'axios';
import {tokenConfig} from './transactionAPI';
import {baseUrl} from './Constants';

export const registerUser = async (email, username, password) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const body = JSON.stringify({email, username, password});
    const login = await axios.post(baseUrl + '/auth/users/', body, config);
    return login;
  } catch (error) {
    throw new Error(error);
  }
};

export const loginUser = async (username, password) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const body = JSON.stringify({username, password});
    const login = await axios.post(
      baseUrl + '/auth/token/login/',
      body,
      config,
    );
    return login;
  } catch (error) {
    throw new Error(error);
  }
};

export const loginSocialUser = async (accesstoken) => {
  try {
    const login = await axios.post(baseUrl + '/auth/google/', {
      access_token: accesstoken,
    });
    return login;
  } catch (error) {
    throw new Error(error);
  }
};

export const logoutUser = async (token) => {
  try {
    const login = await axios.post(
      baseUrl + '/auth/token/logout/',
      tokenConfig(token),
    );
    return login;
  } catch (error) {
    throw new Error(error);
  }
};

export const userDetails = async (token) => {
  try {
    const login = await axios.get(
      baseUrl + '/auth/users/me/',
      tokenConfig(token),
    );
    return login;
  } catch (error) {
    throw new Error(error);
  }
};

export const deleteUser = async () => {
  try {
    const login = await axios.delete(baseUrl + '/auth/users/me/');
    return login;
  } catch (error) {
    throw new Error(error);
  }
};
