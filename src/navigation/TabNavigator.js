import React, { useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
  updateEmail,
  updatePassword,
  login,
  getUser,
} from "../redux/actions/user";
import HomeScreen from "../screens/HomeScreen";
import AppDrawer from "../navigation/AppDrawer";
import Firebase from "../config/Firebase";
import { EventsNavigator } from "../navigation/EventsNavigator";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

const TabNavigator = ({ updateAuthState, getUser }) => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeBackgroundColor: "white",
        inactiveBackgroundColor: "gray",
        activeTintColor: "#000",
        inactiveTintColor: "#fff",
      }}
      screenOptions={{
        cardStyle: { backgroundColor: "#f9e9d2" },
      }}
    >
      <Tab.Screen
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
        name="Home"
      >
        {(screenProps) => (
          <AppDrawer {...screenProps} updateAuthState={updateAuthState} />
        )}
      </Tab.Screen>
      <Tab.Screen
        options={{
          tabBarLabel: "Events",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="calendar" color={color} size={size} />
          ),
        }}
        name="Show Events"
      >
        {(screenProps) => (
          <EventsNavigator {...screenProps} updateAuthState={updateAuthState} />
        )}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    { updateEmail, updatePassword, login, getUser },
    dispatch
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TabNavigator);
