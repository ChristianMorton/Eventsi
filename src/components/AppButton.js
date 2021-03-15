import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

const AppButton = ({ title, onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    marginVertical: 10,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    width: "80%",
    backgroundColor: "tomato",
  },
  buttonText: {
    color: "black",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default AppButton;
