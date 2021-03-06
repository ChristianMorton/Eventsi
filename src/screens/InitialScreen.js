import React, { useEffect } from "react";
import { View, StyleSheet, Text, SafeAreaView } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import Firebase from "../config/Firebase";
import AppButton from "../components/AppButton";
import { getMyEvents } from "../redux/actions/events";
import "firebase/functions";

const InitialScreen = ({ navigation, user, getMyEvents, events }) => {
  const hostEvent = () => {
    console.log("Host Event");
    navigation.navigate("HostEventScreen");
  };

  useEffect(() => {
    getMyEvents();
  }, []);

  const joinEvent = () => {
    console.log("Join Event");
  };

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Welcome! What would you like to do?</Text>
        <Text>{user.email}</Text>
        <Text>{events.event ? events.event[0].description : null}</Text>
        <AppButton title="Host Event" onPress={hostEvent} />
        <AppButton title="Join Event" onPress={joinEvent} />
      </View>
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
  title: {
    fontSize: 20,
    color: "#202020",
    fontWeight: "500",
    marginVertical: 15,
  },
  footerButtonContainer: {
    marginVertical: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  forgotPasswordButtonText: {
    color: "tomato",
    fontSize: 18,
    fontWeight: "600",
  },
});
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ getMyEvents }, dispatch);
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
    events: state.events,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(InitialScreen);
