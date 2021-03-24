import React from "react";
import { View, StyleSheet } from "react-native";

const SquareShape = ({
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
  shape: { position: "absolute" },
});

export default SquareShape;
