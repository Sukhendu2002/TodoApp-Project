import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Modal } from "react-native";
import colors from "../Colors";
import TodoModel from "./todoModel";

export default class TodoList extends React.Component {
  state = {
    showList: false,
  };

  toggleList = () => {
    this.setState({ showList: !this.state.showList });
  };

  render() {
    const list = this.props.list;
    const completedCount = list.todos.filter((todo) => todo.completed).length;
    const remainingCount = list.todos.length - completedCount;
    return (
      <View>
        <Modal
          animationType="slide"
          visible={this.state.showList}
          onRequestClose={() => {
            this.toggleList();
          }}
        >
          <TodoModel
            list={list}
            closeModel={this.toggleList}
            updateList={this.props.updateList}
          />
        </Modal>

        <TouchableOpacity
          style={[styles.container, { backgroundColor: list.color }]}
          onPress={this.toggleList}
        >
          <Text style={styles.listtitle}>{list.name}</Text>
          <View
            style={{
              flexDirection: "row",
              width: "50%",
              justifyContent: "space-between",
            }}
          >
            <View style={{ alignItems: "center" }}>
              <Text style={styles.count}>{completedCount}</Text>
              <Text style={styles.subtitle}>Completed</Text>
            </View>
            <View style={{ alignItems: "center" }}>
              <Text style={styles.count}>{remainingCount}</Text>
              <Text style={styles.subtitle}>Remaining</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    padding: 15,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  listtitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.white,
  },
  count: {
    fontSize: 30,
    fontWeight: "bold",
    color: colors.white,
  },
  subtitle: {
    fontSize: 15,
    color: colors.white,
  },
});
