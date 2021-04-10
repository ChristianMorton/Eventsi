import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const UpcomingEventPanel = () => {
  return (
    <View style={styles.container}>
      <View style={styles.dateContainer}>
        <Text style={{ color: "white" }}>7</Text>
        <Text style={{ color: "white" }}>Mon</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.title}>Dress Code Event</Text>
        <View style={styles.detail}>
          <MaterialCommunityIcons
            name={"calendar-outline"}
            size={20}
            color="#6e6869"
            style={styles.icon}
          />
          <Text style={styles.detailText}>Beginning</Text>
          <Text>09:09AM</Text>
        </View>
        <View style={styles.detail}>
          <MaterialCommunityIcons
            name={"map-marker-outline"}
            size={20}
            color="#6e6869"
            style={styles.icon}
          />
          <Text style={styles.detailText}>Location</Text>
          <Text>New York, USA</Text>
        </View>
      </View>
      <View style={styles.tagContainer}>
        <MaterialCommunityIcons
          name={"bookmark-outline"}
          size={30}
          color="#6e6869"
          style={styles.icon}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 6,
    flexDirection: "row",
    height: 100,
    borderRadius: 15,
  },
  dateContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-evenly",
    paddingVertical: 15,
    margin: 10,
    marginVertical: 20,
    backgroundColor: "#F69970",
    borderRadius: 15,
    shadowColor: "rgba(0,0,0, .2)", // IOS
    shadowOffset: { height: 1, width: 1 }, // IOS
    shadowOpacity: 0.3, // IOS
    shadowRadius: 6, //IOS
    elevation: 5, // Android
  },
  infoContainer: {
    flex: 4,
    marginTop: 10,
    marginLeft: 13,
    alignItems: "flex-start",
  },
  tagContainer: {
    flex: 1,
    marginTop: 20,
  },
  detail: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 5,
  },
  icon: {
    marginRight: 5,
  },
  detailText: {
    marginRight: 10,
    color: "gray",
  },
  title: { fontSize: 18, marginBottom: 15 },
});

export default UpcomingEventPanel;
