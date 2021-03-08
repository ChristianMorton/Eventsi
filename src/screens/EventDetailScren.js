import React from "react";
import { View, Text, SafeAreaView, StyleSheet, StatusBar } from "react-native";

const EventDetailScreen = ({ route, navigation }) => {
  const { id, RSVPTime, name, description, time, dressCode } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.item}>
        <Text style={styles.title}>{name}</Text>
        <Text style={styles.time}>
          Date: {time.getDate()}/{time.getMonth() + 1}/
          {time.getYear() < 2000 ? time.getYear() + 1900 : time.getYear()}
        </Text>
        <Text style={styles.description}>{description}</Text>
        <Text>Dress code: {dressCode}</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: "#fefefe",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
  time: {
    fontSize: 22,
  },
  description: {
    fontSize: 18,
  },
});

export default EventDetailScreen;
