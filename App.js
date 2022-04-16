import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import Header from "./components/header";
import TodoItem from "./components/todoitem";
import AddTodo from "./components/addtodo";
import SandBox from "./components/sandbox";

export default function App() {
  const [todos, setTodos] = useState([
    { text: "buy coffee", key: "1" },
    { text: "create an app", key: "2" },
    { text: "play on the switch", key: "3" },
  ]);

  const pressHandler = (key) => {
    setTodos((prevTodos) => {
      return prevTodos.filter((todo) => todo.key != key);
    });
  };

  const submitHandler = (text) => {
    if (text.length > 3) {
      setTodos((prevTodos) => {
        return [{ text: text, key: Math.random().toString() }, ...prevTodos];
      });
    } else {
      Alert.alert("OOPS!", "Todos must be over 3 chars long", [
        { text: "Understood", onPress: () => console.log("alert closed") },
      ]);
    }
  };
  return (
    // <SandBox/>
    <TouchableWithoutFeedback onPress={()=>{
      Keyboard.dismiss();
    }}>
      <View style={styles.container}>
        <Header />

        {/* Header */}
        <View style={styles.content}>
          <AddTodo submitHandler={submitHandler} />
          {/* Todo Form */}
          <View style={styles.list}>
            <FlatList
              data={todos}
              renderItem={({ item }) => (
                <TodoItem item={item} pressHandler={pressHandler} />
              )}
            />
          </View>
        </View>
        <StatusBar style={styles.auto} />
      </View>
    </TouchableWithoutFeedback>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    flex:1,
    padding: 40,
  },
  list: {
    flex:1,
    marginTop: 20,
  },
});
