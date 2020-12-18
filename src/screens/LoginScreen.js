import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import firebase from '../../config/firebase';

const auth = firebase.auth();

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");  
  const [errorText, setErrorText] = useState('');

  const login = () => {
    Keyboard.dismiss();
    auth
      .signInWithEmailAndPassword(email, password)
      .then((user) => {
        console.log('User Logged In');
      })
      .catch((error) => {
          console.log("Error!");
          console.log(error.message);
          setErrorText(error.message);
      });
  };

  return (
    <View style={styles.containerStyle}>
      <View style={styles.sideContainerStyle}></View>
      <View style={styles.containerLoginStyle}>
        <View style={styles.loginTopContainerStyle}>
          <Text style={styles.mainTextStyle}>Log In</Text>
          <Text style={styles.subTextStyle}>
            Your FAMILIA's waiting for ya!
          </Text>
        </View>
        <TextInput
          style={styles.textInputStyle}
          placeholder="Email"
          value={email}
          textContentType='emailAddress'
          onChangeText={(email) => setEmail(email)}
          autoCapitalize='none'
        />
        <TextInput
          style={styles.textInputStyle}
          placeholder="Password"
          value={password}
          textContentType='password'
          onChangeText={(password) => setPassword(password)}
          autoCapitalize='none'
          secureTextEntry={true}
        />
        <TouchableOpacity 
          style={styles.loginStyle}
          onPress={login}
        >
          <Text style={styles.loginTextStyle}>Login</Text>
        </TouchableOpacity>
        <Text style={styles.errorTextStyle}>{errorText}</Text>
      </View>
      <View style={styles.sideContainerStyle}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#999290",
  },
  containerLoginStyle: {
    flex: 6,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ede7e6",
    borderRadius: 20,
  },
  sideContainerStyle: {
    flex: 1,
  },
  loginTopContainerStyle: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: 'orange',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomWidth: 2,
    borderColor: "orange",
    marginBottom: 40,
  },
  mainTextStyle: {
    fontSize: 36,
    fontWeight: "bold",
    paddingTop: 10,
  },
  subTextStyle: {
    fontSize: 16,
    marginTop: 5,
    marginBottom: 10,
  },
  loginTextStyle: {
    fontSize: 16,
    color: "white",
  },
  textInputStyle: {
    height: 50,
    width: "80%",
    margin: 3,
    padding: 10,
    fontSize: 16,
    backgroundColor: "#fff",
    borderColor: "lightgrey",
    borderWidth: 2,
    borderRadius: 5,
  },
  loginStyle: {
    height: 50,
    width: "70%",
    margin: 10,
    marginBottom: 20,
    backgroundColor: "orange",
    borderWidth: 2,
    borderRadius: 50,
    borderColor: "darkorange",
    alignItems: "center",
    justifyContent: "center",
  },
  errorTextStyle: {
      color: 'red',
      textAlign: 'center',
      width: '80%',
      marginBottom: 20,
  }
});

export default LoginScreen;
