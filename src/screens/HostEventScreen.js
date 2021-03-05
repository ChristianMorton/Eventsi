import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  SafeAreaView,
  Text,
  StyleSheet,
  ScrollView,
  Switch,
  View,
} from "react-native";
import DateTimeInput from "../components/DateTimeInput";
import AppTextInput from "../components/AppTextInput";

const HostEventScreen = () => {
  const [nameOfEvent, setNameOfEvent] = useState("");
  const [date, setDate] = useState(new Date(Date.now()));
  const [replyDate, setReplyDate] = useState(new Date(Date.now()));
  const [isReplyByDateEnabled, setIsReplyByDateEnabled] = useState(false);
  const toggleSwitch = () =>
    setIsReplyByDateEnabled((previousState) => !previousState);
  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <ScrollView>
        <Text>EventScreen</Text>
        <AppTextInput
          value={nameOfEvent}
          onChangeText={(text) => setNameOfEvent(text)}
          //leftIcon="account"
          placeholder="Enter Name of Event"
          autoCapitalize="none"
          keyboardType="default"
          textContentType="none"
        />
        <DateTimeInput setDate={setDate} date={date} isDateOfEvent={true} />
        <View style={styles.switchContainer}>
          <Text style={styles.title}>RSVP? </Text>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={isReplyByDateEnabled ? "#f5dd4b" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
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

        <StatusBar style="auto" />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    backgroundColor: "white",
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

export default HostEventScreen;
