import React, { useState } from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import AppButton from "../components/AppButton";
import AppTextInput from "../components/AppTextInput";
import { joinEvent } from "../redux/actions/events";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Clipboard from "expo-clipboard";

const JoinEventScreen = ({ navigation, joinEvent, events }) => {
  const [eventID, setEventID] = useState("");

  const fetchCopiedText = async () => {
    const text = await Clipboard.getStringAsync();
    setEventID(text);
  };

  const joinEventButton = async (id) => {
    joinEvent(id).then(() => {
      const joinedEvent = events.event.find((element) => element.id == id);
      navigation.navigate("Show Events");
    });
  };

  return (
    <SafeAreaView>
      <View>
        <AppTextInput
          value={eventID}
          onChangeText={(text) => setEventID(text)}
          //leftIcon="account"
          placeholder="Enter Event ID"
          autoCapitalize="none"
          keyboardType="default"
          textContentType="none"
        />
        <AppButton title="Paste from Clipboard" onPress={fetchCopiedText} />
        <AppButton
          title="Join"
          onPress={() => {
            joinEventButton(eventID);
          }}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ joinEvent }, dispatch);
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
    events: state.events,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(JoinEventScreen);
