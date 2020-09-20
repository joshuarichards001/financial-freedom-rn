import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import {Button} from 'react-native-elements';
import {GoogleSignin, GoogleSigninButton} from 'react-native-google-signin';

/**
 * The form where the user will log into the application.
 *
 * @param onLoginClick when the login button is pressed.
 * @param onRegisterClick when the register button is pressed.
 * @param loading when the users data is loading.
 * @param onGoogleClick when the google sign in button is pressed.
 */
export default function Login({
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
      {showRegister ? (
        <Text style={styles.title}>Register</Text>
      ) : (
        <Text style={styles.title}>Login</Text>
      )}
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
      <View style={{flexDirection: 'row', marginTop: 20}}>
        <Button
          title="Login"
          style={styles.button}
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
          style={styles.button}
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
      </View>
      <Button
        title="Login As Guest"
        style={styles.guestButton}
        onPress={() => {
          onLoginClick('a', 'a');
        }}
      />
      <GoogleSigninButton
        style={{width: 210, height: 50, margin: 2, marginBottom: 30}}
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={signIn}
      />
      {loading ? <Text>Content Is Loading...</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    margin: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 40,
    marginBottom: 20,
  },
  button: {
    width: 95,
    borderRadius: 5,
    margin: 5,
  },
  guestButton: {
    width: 200,
    borderRadius: 5,
    margin: 5,
  },
  input: {
    height: 40,
    width: 200,
    marginBottom: 10,
    borderRadius: 5,
    borderColor: 'gray',
    borderWidth: 1,
  },
});
