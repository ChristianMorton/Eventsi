import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  SafeAreaView,
  Text,
  StyleSheet,
  ScrollView,
  Switch,
  View,
  Pressable,
  Modal,
} from "react-native";
import DateTimeInput from "../components/DateTimeInput";
import AppTextInput from "../components/AppTextInput";
import AppButton from "../components/AppButton";
import { createEvent } from "../redux/actions/events";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import "firebase/firestore";
import * as firebase from "firebase";
import MapModal from "../components/MapModal";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const HostEventScreen = ({ navigation, createEvent }) => {
  const [nameOfEvent, setNameOfEvent] = useState("");
  const [descriptionOfEvent, setDescriptionOfEvent] = useState("");
  const [isDressCodeEnabled, setIsDressCodeEnabled] = useState(false);
  const [dressCode, setDressCode] = useState("");
  const [date, setDate] = useState(new Date(Date.now()));
  const [isEndDateEnabled, setIsEndDateEnabled] = useState(false);
  const [endDate, setEndDate] = useState(new Date(Date.now()));
  const [replyDate, setReplyDate] = useState(new Date(Date.now()));
  const [isReplyByDateEnabled, setIsReplyByDateEnabled] = useState(false);
  const [longitudeLatitude, setLongitudeLatitude] = useState(null);
  const [mapVisible, setMapVisible] = useState(false);
  const [searchedLocation, setSearchedLocation] = useState(null);

  const toggleRSVPSwitch = () =>
    setIsReplyByDateEnabled((previousState) => !previousState);
  const toggleDressCodeSwitch = () =>
    setIsDressCodeEnabled((previousState) => !previousState);
  const toggleEndDateSwitch = () =>
    setIsEndDateEnabled((previousState) => !previousState);

  const createEventButton = () => {
    createEvent({
      description: descriptionOfEvent,
      dressCode: dressCode,
      hasDressCode: isDressCodeEnabled,
      hasRsvp: isReplyByDateEnabled,
      name: nameOfEvent,
      replyByTime: firebase.firestore.Timestamp.fromDate(replyDate),
      time: firebase.firestore.Timestamp.fromDate(date),
      Location: new firebase.firestore.GeoPoint(
        longitudeLatitude.coords.latitude,
        longitudeLatitude.coords.longitude
      ),
      endTime: firebase.firestore.Timestamp.fromDate(endDate),
    });
    navigation.goBack();
    navigation.navigate("Your Events");
  };

  const _toggleMap = () => {
    setMapVisible(!mapVisible);
  };

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <ScrollView>
        <View style={styles.container}>
          <AppTextInput
            value={nameOfEvent}
            onChangeText={(text) => setNameOfEvent(text)}
            //leftIcon="account"
            placeholder="Enter Name of Event"
            autoCapitalize="none"
            keyboardType="default"
            textContentType="none"
          />
          <AppTextInput
            value={descriptionOfEvent}
            onChangeText={(text) => setDescriptionOfEvent(text)}
            //leftIcon="account"
            placeholder="Enter Description of Event"
            autoCapitalize="none"
            keyboardType="default"
            textContentType="none"
            description={true}
          />
          <View style={styles.switchContainer}>
            <Text style={styles.title}>Dress code? </Text>
            <Switch
              trackColor={{ false: "#F2F2F2", true: "#F2F2F2" }}
              thumbColor={"#7EACA7"}
              ios_backgroundColor="#F2F2F2"
              onValueChange={toggleDressCodeSwitch}
              value={isDressCodeEnabled}
            />
          </View>
          {isDressCodeEnabled ? (
            <AppTextInput
              value={dressCode}
              onChangeText={(text) => setDressCode(text)}
              //leftIcon="account"
              placeholder="Enter Dress Code"
              autoCapitalize="none"
              keyboardType="default"
              textContentType="none"
            />
          ) : null}
          <DateTimeInput setDate={setDate} date={date} isDateOfEvent={true} />
          <View style={styles.switchContainer}>
            <Text style={styles.title}>Set an end date? </Text>
            <Switch
              trackColor={{ false: "#F2F2F2", true: "#F2F2F2" }}
              thumbColor={"#7EACA7"}
              ios_backgroundColor="#F2F2F2"
              onValueChange={toggleEndDateSwitch}
              value={isEndDateEnabled}
            />
          </View>
          {isEndDateEnabled ? (
            <DateTimeInput
              setDate={setEndDate}
              date={endDate}
              isDateOfEvent={false}
              isEndDate={true}
            />
          ) : null}
          <View style={styles.switchContainer}>
            <Text style={styles.title}>RSVP? </Text>
            <Switch
              trackColor={{ false: "#F2F2F2", true: "#F2F2F2" }}
              thumbColor={"#7EACA7"}
              ios_backgroundColor="#F2F2F2"
              onValueChange={toggleRSVPSwitch}
              value={isReplyByDateEnabled}
            />
          </View>
          {isReplyByDateEnabled ? (
            <DateTimeInput
              setDate={setReplyDate}
              date={replyDate}
              isDateOfEvent={false}
            />
          ) : null}
          <Pressable style={styles.mapButton} onPress={_toggleMap}>
            <Text>{searchedLocation ? searchedLocation : "Location"}</Text>
            <MaterialCommunityIcons
              name={"map-marker"}
              size={40}
              color="#F69970"
              style={styles.icon}
            />
          </Pressable>
          <Modal animationType="slide" transparent={false} visible={mapVisible}>
            <MapModal
              longitudeLatitude={longitudeLatitude}
              setLongitudeLatitude={setLongitudeLatitude}
              navigation={navigation}
              toggleModal={_toggleMap}
              setSearchedLocation={setSearchedLocation}
            />
          </Modal>
          <AppButton title="Create event" onPress={createEventButton} />
          <StatusBar style="auto" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  container: {
    alignItems: "center",
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: "10%",
    alignSelf: "stretch",
  },
  title: {
    fontSize: 20,
    color: "#202020",
    fontWeight: "500",
    marginVertical: 15,
  },
  mapButton: {
    marginVertical: 10,
    borderRadius: 14,
    justifyContent: "space-around",
    alignItems: "center",
    padding: 15,
    marginHorizontal: 20,
    width: "80%",
    shadowColor: "rgba(0,0,0, .2)", // IOS
    shadowOffset: { height: 1, width: 1 }, // IOS
    shadowOpacity: 0.3, // IOS
    shadowRadius: 4, //IOS
    backgroundColor: "#fff",
    elevation: 3, // Android
    flexDirection: "row",
  },
  icon: {},
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ createEvent }, dispatch);
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
    events: state.events,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HostEventScreen);
