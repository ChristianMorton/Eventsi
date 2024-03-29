import React from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as firebase from "firebase";

const EventListPanel = ({ name, description, time, eventInfo }) => {
  const navigation = useNavigation();
  const uid = firebase.auth().currentUser.uid;

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
          Location: eventInfo.Location,
          hasRSVP: eventInfo.hasRsvp,
          invited: eventInfo.invited,
        });
      }}
    >
      <View style={styles.item}>
        <Text style={styles.title}>{name}</Text>
        <Text style={styles.description}>{eventInfo.invited[uid].status}</Text>
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
    backgroundColor: "#F4D2D3",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
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
