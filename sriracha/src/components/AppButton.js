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
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    width: "80%",
    backgroundColor: "#7EACA7",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default AppButton;
