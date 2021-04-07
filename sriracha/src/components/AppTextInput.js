import React from "react";
import { View, StyleSheet, TextInput } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const AppTextInput = ({ leftIcon, description = false, ...otherProps }) => {
  return (
    <View
      style={
        description ? { ...styles.container, height: 150 } : styles.container
      }
    >
      {leftIcon && (
        <MaterialCommunityIcons
          name={leftIcon}
          size={20}
          color="#6e6869"
          style={styles.icon}
        />
      )}
      <TextInput
        style={styles.input}
        placeholderTextColor="#D7D8DC"
        multiline={true}
        {...otherProps}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F5F5F5",
    borderRadius: 15,
    flexDirection: "row",
    padding: 20,
    marginVertical: 10,
    width: "90%",
  },
  icon: {
    marginRight: 10,
  },
  input: {
    width: "80%",
    fontSize: 18,
    color: "#6e6869",
  },
});

export default AppTextInput;
