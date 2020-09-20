import React, {useState} from 'react';
import {StyleSheet, Text, TextInput, Button, View} from 'react-native';

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
      {loading ? (
        <Text>Content Is Loading, this may take a minute...</Text>
      ) : null}
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
