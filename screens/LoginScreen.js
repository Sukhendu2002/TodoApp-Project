import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/core";
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TouchableOpacity,
  TextInput,
  Image,
  Keyboard,
} from "react-native";

import { signIn, auth } from "../fire";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //loding
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigation.replace("Home");
      }
    });
    return unsubscribe;
  }),
    [];

  const handleLogin = () => {
    //down the keyboard
    Keyboard.dismiss();
    //chack if email and password is empty
    if (email === "" || password === "") {
      alert("Please enter email and password");
      return;
    }

    setLoading(true);
    auth
      .signInWithEmailAndPassword(email, password)
      .then((res) => {
        const user = res.user;
        console.log(user.email);
        setLoading(false);
      })
      .catch((error) => {
        //error handling
        if (error.code === "auth/invalid-email") {
          alert("Invalid Email");
        } else if (error.code === "auth/user-not-found") {
          alert("User not found");
        } else if (error.code === "auth/wrong-password") {
          alert("Wrong password");
        } else {
          alert(error.message);
        }
        setLoading(false);
      });

    // signIn(email, password)
    //   .then((user) => {
    //     console.log("Login");
    //     navigation.replace("Home");
    //   })
    //   .catch((error) => {
    //     alert(error.message);
    //   });

    //chack if the fields are empty
    if (email === "" || password === "") {
      alert("Please fill all the fields");
    }
  };

  const handleKeyboard = () => {
    Keyboard.dismiss();
  };

  const handleRegister = () => {
    console.log("Go to  Register Screen");
    navigation.navigate("Signup");
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={styles.logoContainer}>
        <Text style={styles.title}>Todo App</Text>
        {loading ? (
          <Image
            source={require("../assets/logo.gif")}
            style={{
              width: 70,
              height: 70,
            }}
            resizeMode="contain"
          />
        ) : null}
      </View>

      <View style={styles.inputcontainer}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry={true}
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
      </View>
      <View style={styles.buttoncontainer}>
        <TouchableOpacity style={[styles.button]}>
          <Text style={styles.buttonText} onPress={handleLogin}>
            Login
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText} onPress={handleRegister}>
            Register
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  inputcontainer: {
    width: "80%",
    marginTop: 100,
  },
  input: {
    borderColor: "#000",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
    marginBottom: 10,
    borderBottomWidth: 1,
  },
  buttoncontainer: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  button: {
    backgroundColor: "#0782F9",
    width: "100%",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    color: "#fff",
    marginBottom: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 20,
  },
  //loading animation
  loading: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  logoContainer: {
    alignItems: "center",
    // backgroundColor: "#000",
    marginBottom: 70,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 20,
  },
});
