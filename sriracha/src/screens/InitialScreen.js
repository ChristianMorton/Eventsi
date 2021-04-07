import React, { useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  TouchableHighlight,
} from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { MaterialCommunityIcons } from "@expo/vector-icons";
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
    navigation.navigate("JoinEventScreen");
  };

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <View style={styles.container}>
        <AppButton title="Host Event" onPress={hostEvent} />
        <AppButton title="Join Event" onPress={joinEvent} />
        <TouchableHighlight
          onPress={() => {
            navigation.navigate("Your Events");
          }}
        >
          <View>
            <MaterialCommunityIcons name="calendar" color="black" size={20} />
            <Text>Events</Text>
          </View>
        </TouchableHighlight>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    backgroundColor: "#fff",
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
