import React from "react";
import HomeScreen from "../screens/HomeScreen";
import EventDetailScreen from "../screens/EventDetailScren";
import { createStackNavigator } from "@react-navigation/stack";
import { Text, StyleSheet } from "react-native";
import ImageButton from "../components/ImageButton";

const EventsStack = createStackNavigator();

const HeaderHomeTitle = () => {
  return <Text style={styles.headerTitle}>Upcoming Events</Text>;
};

const HomeSettings = () => {
  return (
    <ImageButton
      icon="tune"
      style={styles.settingsButton}
      onPress={() => console.log("SettingsButton")}
    />
  );
};

const styles = StyleSheet.create({
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "left",
    marginLeft: 30,
    color: "#2B475C",
  },
  settingsButton: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
});

export const EventsNavigator = (props) => {
  return (
    <EventsStack.Navigator initialRouteName="Home">
      <EventsStack.Screen
        name="Home"
        options={{
          title: "",
          headerLeft: () => <HeaderHomeTitle />,
          headerRight: () => <HomeSettings />,
        }}
      >
        {(screenProps) => (
          <HomeScreen
            {...screenProps}
            updateAuthState={props.updateAuthState}
          />
        )}
      </EventsStack.Screen>
      <EventsStack.Screen
        name="Details"
        options={{
          title: "Event Details",
          headerTitle: (routeOps) => <HeaderHomeTitle {...routeOps} />,
        }}
      >
        {(screenProps) => (
          <EventDetailScreen
            {...screenProps}
            updateAuthState={props.updateAuthState}
          />
        )}
      </EventsStack.Screen>
    </EventsStack.Navigator>
  );
};
