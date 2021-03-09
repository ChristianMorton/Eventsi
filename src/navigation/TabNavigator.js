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

const Tab = createBottomTabNavigator();

const TabNavigator = ({ updateAuthState, getUser }) => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home">
        {(screenProps) => (
          <AppDrawer {...screenProps} updateAuthState={updateAuthState} />
        )}
      </Tab.Screen>
      <Tab.Screen name="Show Events">
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
