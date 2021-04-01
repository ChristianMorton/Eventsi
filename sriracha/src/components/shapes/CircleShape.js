import React from "react";
import { View, StyleSheet } from "react-native";

const CircleShape = ({
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
        borderRadius: width / 2,
      }}
    />
  );
};

const styles = StyleSheet.create({
  shape: {},
});

export default CircleShape;
