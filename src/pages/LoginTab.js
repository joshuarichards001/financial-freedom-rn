import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, TextInput, Button, View} from 'react-native';
import {GoogleSignin, GoogleSigninButton} from 'react-native-google-signin';

export default function LoginTab({
  onLoginClick,
  onRegisterClick,
  loading,
  onGoogleClick,
}) {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [showRegister, setShowRegister] = useState(false);

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      await GoogleSignin.signIn();
      const tokens = await GoogleSignin.getTokens();
      onGoogleClick(tokens.accessToken);
    } catch (error) {
      console.log(error.statusCodes);
    }
  };

  useEffect(() => {
    GoogleSignin.configure({
      iosClientId:
        '551797952328-4io9c9sl5un9c8ouoce1ct7c0mkjmj4h.apps.googleusercontent.com',
    });
  }, []);

  return (
    <View style={styles.screen}>
      {showRegister ? <Text>Register</Text> : <Text>Login</Text>}
      {showRegister ? <Text>Email</Text> : null}
      {showRegister ? (
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
      ) : null}
      <Text>User Name</Text>
      <TextInput
        style={styles.input}
        value={userName}
        onChangeText={(text) => setUserName(text)}
      />
      <Text>Password</Text>
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <Button
        title="Login"
        onPress={() => {
          if (!showRegister) {
            onLoginClick(userName, password);
          } else {
            setShowRegister(false);
          }
        }}
      />
      <Button
        title="Register"
        onPress={() => {
          if (
            (!showRegister || email.length,
            userName.length,
            password.length === 0)
          ) {
            setShowRegister(true);
          } else {
            onRegisterClick(email, userName, password);
          }
        }}
      />
      <Button
        title="Login As Guest"
        onPress={() => {
          onLoginClick('a', 'a');
        }}
      />
      <GoogleSigninButton
        style={{width: 192, height: 48}}
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={signIn}
      />
      {/* {loading ? (
        <Text>Content Is Loading, this may take a minute...</Text>
      ) : null} */}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    margin: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 40,
    width: 200,
    borderColor: 'gray',
    borderWidth: 1,
  },
});
