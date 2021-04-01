import React from "react";
import { View, StyleSheet } from "react-native";

const RectangleShape = ({
  bottom,
  left,
  width,
  height,
  color,
  opacity,
  zIndex,
}) => {
  return (
    <View
      style={{
        ...styles.shape,
        width: width,
        height: height,
        bottom: bottom,
        left: left,
        backgroundColor: color,
        opacity: opacity,
        zIndex: zIndex,
      }}
    />
  );
};

const styles = StyleSheet.create({
  shape: {
    marginTop: 20,
    position: "absolute",
  },
});

export default RectangleShape;
