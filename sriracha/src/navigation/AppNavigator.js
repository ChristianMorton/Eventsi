import React from "react";
import HostEventScreen from "../screens/HostEventScreen";
import InitialScreen from "../screens/InitialScreen";
import { createStackNavigator } from "@react-navigation/stack";
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
      <AppStack.Screen
        name="HostEventScreen"
        options={{ title: "Events Details" }}
      >
        {(screenProps) => (
          <HostEventScreen
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
