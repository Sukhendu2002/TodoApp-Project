import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/core";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Modal,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import tempData from "../tempData";
import TodoList from "../components/todoList";
import colors from "../Colors";
import ListModel from "../components/listModel";
import { auth, db, getList } from "../fire";

export default class HomeScreen extends React.Component {
  state = {
    addTodoVisibility: false,
    lists: tempData,
  };

  toggleAddTodoVisibility = () => {
    this.setState({ addTodoVisibility: !this.state.addTodoVisibility });
  };

  rendertodoList = (list) => {
    return <TodoList list={list} updateList={this.updateList} />;
  };

  logout = () => {
    auth
      .signOut()
      .then(() => {
        console.log("Logged out successfully");
        this.props.navigation.replace("Login");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  addList = (list) => {
    this.setState({
      lists: [
        ...this.state.lists,
        {
          ...list,
          id: this.state.lists.length + 1,
          todos: [],
        },
      ],
    });
  };
  updateList = (list) => {
    this.setState({
      lists: this.state.lists.map((item) =>
        item.id === list.id ? list : item
      ),
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <Modal
          animationType="slide"
          visible={this.state.addTodoVisibility}
          onRequestClose={this.toggleAddTodoVisibility}
        >
          <ListModel
            closeModel={this.toggleAddTodoVisibility}
            addList={this.addList}
          />
        </Modal>
        <View style={styles.Maincontainer}>
          <Text style={styles.title}>Todo List</Text>
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={this.logout}>
          <Text style={styles.logout}>
            <AntDesign name="logout" size={20} color="black" />
          </Text>
        </TouchableOpacity>

        <Text>Email: {auth.currentUser?.email}</Text>
        <Text></Text>

        <FlatList
          data={this.state.lists}
          keyExtractor={(item) => item.name}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => this.rendertodoList(item)}
          keyboardShouldPersistTaps="always"
        />
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => {
            this.toggleAddTodoVisibility();
          }}
        >
          <View style={styles.add}>
            <Icon name="add" size={30} color="red" />
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingTop: 5,
  },
  Maincontainer: {
    paddingTop: 50,
    paddingBottom: 20,
  },
  title: {
    fontSize: 30,
    color: "#000",
    fontWeight: "bold",
  },
  items: {
    marginTop: 20,
  },
  inputContainer: {
    position: "absolute",
    bottom: 60,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: 20,
  },

  addButton: {
    width: 60,
    height: 60,
    borderRadius: 60,
    backgroundColor: "#FFF",
    borderColor: "#C0C0C0",
    borderWidth: 1,
    position: "absolute",
    bottom: 20,
    right: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  logoutButton: {
    width: 50,
    height: 50,
    borderRadius: 60,
    backgroundColor: "#FFF",
    borderColor: "#C0C0C0",
    borderWidth: 1,
    position: "absolute",
    top: 65,
    right: 30,
    justifyContent: "center",
    alignItems: "center",
  },
});
