import React from "react";
import HomeScreen from "../screens/HomeScreen";
import HostEventScreen from "../screens/HostEventScreen";
import InitialScreen from "../screens/InitialScreen";
import { createStackNavigator } from "@react-navigation/stack";

const AppStack = createStackNavigator();

export const AppNavigator = (props) => {
  return (
    <AppStack.Navigator initialRouteName="InitialLogin" headerMode="none">
      <AppStack.Screen name="InitialLogin">
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
    </AppStack.Navigator>
  );
};
