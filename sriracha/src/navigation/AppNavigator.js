import React from "react";
import HomeScreen from "../screens/HomeScreen";
import HostEventScreen from "../screens/HostEventScreen";
import InitialScreen from "../screens/InitialScreen";
import { createStackNavigator } from "@react-navigation/stack";
import JoinEventScreen from "../screens/JoinEventScreen";
import { EventsNavigator } from "./EventsNavigator";

const AppStack = createStackNavigator();

export const AppNavigator = (props) => {
  return (
    <AppStack.Navigator initialRouteName="Home">
      <AppStack.Screen name="Home" options={{ headerShown: false }}>
        {(screenProps) => (
          <InitialScreen
            {...screenProps}
            updateAuthState={props.updateAuthState}
          />
        )}
      </AppStack.Screen>
      <AppStack.Screen name="HostEventScreen">
        {(screenProps) => (
          <HostEventScreen
            {...screenProps}
            updateAuthState={props.updateAuthState}
          />
        )}
      </AppStack.Screen>
      <AppStack.Screen name="JoinEventScreen">
        {(screenProps) => (
          <JoinEventScreen
            {...screenProps}
            updateAuthState={props.updateAuthState}
          />
        )}
      </AppStack.Screen>
      <AppStack.Screen name="Your Events">
        {(screenProps) => (
          <EventsNavigator
            {...screenProps}
            updateAuthState={props.updateAuthState}
          />
        )}
      </AppStack.Screen>
    </AppStack.Navigator>
  );
};
