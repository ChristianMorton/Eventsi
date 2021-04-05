import React from "react";
import { StyleSheet, Text, Pressable } from "react-native";

const AppButton = ({ title, onPress }) => {
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </Pressable>
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
    backgroundColor: "#9AB7D2",
  },
  buttonText: {
    color: "black",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default AppButton;
