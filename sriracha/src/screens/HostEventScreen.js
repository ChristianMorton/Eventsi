import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  SafeAreaView,
  Text,
  StyleSheet,
  ScrollView,
  Switch,
  View,
  Dimensions,
  CheckBox,
} from "react-native";
import DateTimeInput from "../components/DateTimeInput";
import AppTextInput from "../components/AppTextInput";
import AppButton from "../components/AppButton";
import { createEvent } from "../redux/actions/events";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import "firebase/firestore";
import * as firebase from "firebase";
import MapView from "react-native-maps";
import MapComponent from "../components/MapComponent";

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
    navigation.navigate("Show Events");
  };

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <ScrollView>
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
        />
        <View style={styles.switchContainer}>
          <Text style={styles.title}>Dress code? </Text>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={isDressCodeEnabled ? "#f5dd4b" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
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
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={isEndDateEnabled ? "#f5dd4b" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
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
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={isReplyByDateEnabled ? "#f5dd4b" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
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
        <MapComponent
          longitudeLatitude={longitudeLatitude}
          setLongitudeLatitude={setLongitudeLatitude}
          style={{
            map: {
              width: Dimensions.get("window").width,
              height: Dimensions.get("window").width,
            },
          }}
          navigation={navigation}
        />
        <AppButton title="Create event" onPress={createEventButton} />
        <StatusBar style="auto" />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    backgroundColor: "#f9e9d2",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  title: {
    fontSize: 20,
    color: "#202020",
    fontWeight: "500",
    marginVertical: 15,
  },
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
