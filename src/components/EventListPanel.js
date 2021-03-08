import React from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const EventListPanel = ({ name, description, time, eventInfo }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => {
        /* 1. Navigate to the Details route with params */
        navigation.navigate("Details", {
          name: name,
          description: description,
          time: time,
          dressCode: eventInfo.dressCode,
          RSVPTime: eventInfo.replyByTime.toDate(),
          id: eventInfo.id,
        });
      }}
    >
      <View style={styles.item}>
        <Text style={styles.title}>{name}</Text>
        <Text style={styles.description}>{description}</Text>
        <Text style={styles.date}>
          {time.getDate()}/{time.getMonth() + 1}/
          {time.getYear() < 2000 ? time.getYear() + 1900 : time.getYear()}
        </Text>
      </View>
    </TouchableOpacity>
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
  date: {
    fontSize: 18,
  },
  description: {
    fontSize: 18,
  },
});

export default EventListPanel;
