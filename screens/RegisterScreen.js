import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";
import { signUp, auth } from "../fire";

const RegisterScreen = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const navigation = useNavigation();

  const hendleSignUp = () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((res) => {
        const user = res.user;
        console.log(user.email);
        navigation.navigate("Login");
      })
      .catch((err) => {
        alert(err.message);
      });

    // signUp(email, password)
    //   .then(() => {
    //     navigation.navigate("Login");
    //   })
    //   .catch((error) => {
    //     alert(error);
    //   });
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <TouchableOpacity
        style={{ position: "absolute", top: 50, left: 32 }}
        onPress={() => navigation.navigate("Login")}
      >
        <AntDesign name="back" size={32} color="black" />
      </TouchableOpacity>
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
        <TouchableOpacity style={styles.button} onPress={() => hendleSignUp()}>
          <Text style={styles.buttonText}>Registerr</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;

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
});
