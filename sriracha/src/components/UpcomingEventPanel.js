import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Pressable } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import * as Location from "expo-location";

const _formatLocationDataString = (dataArray) => {
  var tempPostalAddress = "";
  if (dataArray[0].city != null) {
    tempPostalAddress += dataArray[0].city + ", ";
  }
  if (dataArray[0].country != null) {
    tempPostalAddress += dataArray[0].country + " ";
  }
  return tempPostalAddress;
};

const UpcomingEventPanel = ({ isBookmarked, eventInfo }) => {
  const [bookmarked, setBookmarked] = useState(false);
  const [address, setAddress] = useState("");
  const [searched, setSearched] = useState(false);

  const navigation = useNavigation();

  useEffect(() => {
    setBookmarked(isBookmarked);
  }, []);

  useEffect(() => {
    const searchGeopoint = async () => {
      Location.reverseGeocodeAsync({
        longitude: eventInfo.Location.longitude,
        latitude: eventInfo.Location.latitude,
      })
        .then((res) => {
          setAddress(_formatLocationDataString(res));
          setSearched(true);
        })
        .catch((err) => {
          alert(err);
          console.log(err);
        });
    };
    searchGeopoint();
  }, []);

  const time = eventInfo.time.toDate();

  return (
    <Pressable
      onPress={() => {
        /* 1. Navigate to the Details route with params */
        navigation.navigate("Details", {
          name: eventInfo.name,
          description: eventInfo.description,
          time: eventInfo.time.toDate(),
          dressCode: eventInfo.dressCode,
          RSVPTime: eventInfo.replyByTime.toDate(),
          id: eventInfo.id,
          Location: eventInfo.Location,
          hasRSVP: eventInfo.hasRsvp,
          invited: eventInfo.invited,
        });
      }}
    >
      <View style={styles.container}>
        <View style={styles.dateContainer}>
          <Text style={{ color: "white" }}>
            {time.toLocaleDateString("en-US", { day: "numeric" })}
          </Text>
          <Text style={{ color: "white" }}>
            {time.toLocaleDateString("en-US", { weekday: "short" })}
          </Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.title}>{eventInfo.name}</Text>
          <View style={styles.detail}>
            <MaterialCommunityIcons
              name={"calendar-outline"}
              size={20}
              color="#6e6869"
              style={styles.icon}
            />
            <Text style={styles.detailText}>Beginning</Text>
            <Text>
              {time.toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </Text>
          </View>
          <View style={styles.detail}>
            <MaterialCommunityIcons
              name={"map-marker-outline"}
              size={20}
              color="#6e6869"
              style={styles.icon}
            />
            <Text style={styles.detailText}>Location</Text>
            <Text>{address}</Text>
          </View>
        </View>
        <View style={styles.tagContainer}>
          <Pressable onPress={() => setBookmarked(!bookmarked)}>
            <MaterialCommunityIcons
              name={bookmarked ? "bookmark" : "bookmark-outline"}
              size={30}
              color={bookmarked ? "orange" : "#6e6869"}
              style={styles.icon}
            />
          </Pressable>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 6,
    flexDirection: "row",
    height: 120,
    marginVertical: 5,
    borderRadius: 15,
    shadowColor: "rgba(0,0,0, .4)", // IOS
    shadowOffset: { height: 1, width: 1 }, // IOS
    shadowOpacity: 0.5, // IOS
    shadowRadius: 6, //IOS
    elevation: 5, // Android
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
    paddingVertical: 2,
  },
  title: {
    fontSize: 18,
    marginBottom: 15,
    color: "#2B475C",
    fontWeight: "bold",
  },
});

export default UpcomingEventPanel;
