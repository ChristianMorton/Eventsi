import React from "react";
import { View, Text, StyleSheet } from "react-native";

const DetailsTab = ({ id, RSVPTime, name, description, time, dressCode }) => {
  return (
    <View>
      <Text>{name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export default DetailsTab;
