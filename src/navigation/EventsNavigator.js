import React from "react";
import HomeScreen from "../screens/HomeScreen";
import EventDetailScreen from "../screens/EventDetailScren";
import { createStackNavigator } from "@react-navigation/stack";

const EventsStack = createStackNavigator();

export const EventsNavigator = (props) => {
  return (
    <EventsStack.Navigator initialRouteName="Home" headerMode="none">
      <EventsStack.Screen name="Home">
        {(screenProps) => (
          <HomeScreen
            {...screenProps}
            updateAuthState={props.updateAuthState}
          />
        )}
      </EventsStack.Screen>
      <EventsStack.Screen name="Details">
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
