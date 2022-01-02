import React from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableOpacity,
  TextInput,
  Button,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import colors from "../Colors";
import tempData from "../tempData";

export default class ListModel extends React.Component {
  backgroundColors = [
    "#5CD859",
    "#24A6D9",
    "#595BD9",
    "#8022D9",
    "#D159D8",
    "#D85963",
    "#D88559",
  ];
  state = {
    name: "",
    color: this.backgroundColors[0],
  };

  createList = () => {
    const { name, color } = this.state;
    //chack if name is empty
    if (name === "") {
      alert("Please enter a name");
      return;
    }

    const list = {
      name,
      color,
    };
    this.props.addList(list);
    this.setState({ name: "" });
    this.props.closeModel();
  };

  renderColors = () => {
    return this.backgroundColors.map((color) => {
      return (
        <TouchableOpacity
          key={color}
          style={[styles.color, { backgroundColor: color }]}
          onPress={() => this.setState({ color })}
        />
      );
    });
  };

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <TouchableOpacity
          style={{ position: "absolute", top: 3, right: 32 }}
          onPress={() => this.props.closeModel()}
        >
          <AntDesign name="close" size={32} color="black" />
        </TouchableOpacity>

        <View style={styles.modelcon}>
          <Text style={styles.title}>Create List</Text>

          <TextInput
            style={styles.input}
            placeholder="Enter Todo"
            onChangeText={(text) => this.setState({ name: text })}
          />

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 20,
            }}
          >
            {this.renderColors()}
          </View>

          <TouchableOpacity
            style={[styles.create, { backgroundColor: this.state.color }]}
            onPress={this.createList}
          >
            <Text
              style={{
                color: colors.white,
                fontWeight: "800",
                backgroundColor: "transparent",
                fontSize: 20,
              }}
            >
              Create
              {/* <Button
                title="Create"
                onPress={this.createList}
                style={{
                  //remove border and make it transparent
                  borderWidth: 0,
                  backgroundColor: "transparent",
                }}
              /> */}
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 30,
    fontWeight: "900",
    alignSelf: "center",
    marginBottom: 16,
  },
  modelcon: {
    alignSelf: "stretch",
    marginHorizontal: 32,
  },
  input: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.blue,
    borderRadius: 6,
    height: 50,
    marginTop: 8,
    paddingHorizontal: 16,
    fontSize: 18,
  },
  create: {
    marginTop: 24,
    height: 50,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
  },

  color: {
    width: 30,
    height: 30,
    borderRadius: 4,
  },
});
