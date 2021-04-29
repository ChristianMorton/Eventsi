import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const ImageButton = ({ icon, onPress, style }) => {
  return (
    <TouchableOpacity style={style ? style : styles.button} onPress={onPress}>
      {icon && (
        <MaterialCommunityIcons
          name={icon}
          size={40}
          color="#2B475C"
          style={styles.icon}
        />
      )}
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
  icon: {},
});

export default ImageButton;
