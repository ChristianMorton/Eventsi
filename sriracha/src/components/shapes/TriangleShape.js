import React from "react";
import { View, StyleSheet } from "react-native";

const TriangleShape = ({
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
        borderLeftWidth: width,
        borderRightWidth: width,
        borderBottomWidth: height,
        bottom: bottom,
        left: left,
        backgroundColor: color,
        borderBottomColor: color,
        opacity: opacity,
        zIndex: zIndex,
      }}
    />
  );
};

const styles = StyleSheet.create({
  shape: {
    width: 0,
    height: 0,
    borderLeftWidth: 60,
    borderRightWidth: 60,
    borderBottomWidth: 120,
    borderStyle: "solid",
    backgroundColor: "transparent",
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    position: "absolute",
  },
});

export default TriangleShape;
