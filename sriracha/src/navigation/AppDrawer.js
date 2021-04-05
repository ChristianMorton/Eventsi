import React from "react";
import SettingsScreen from "../screens/SettingsScreen";
import { AppNavigator } from "./AppNavigator";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
  updateEmail,
  updatePassword,
  login,
  getUser,
} from "../redux/actions/user";
import StorybookUIRoot from "../../storybook";

const Drawer = createDrawerNavigator();

const AppDrawer = ({ updateAuthState, getUser }) => {
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="Home">
        {(screenProps) => (
          <AppNavigator {...screenProps} updateAuthState={updateAuthState} />
        )}
      </Drawer.Screen>

      <Drawer.Screen name="Settings">
        {(screenProps) => (
          <SettingsScreen {...screenProps} updateAuthState={updateAuthState} />
        )}
      </Drawer.Screen>
      <Drawer.Screen name="Storybook">
        {() => <StorybookUIRoot />}
      </Drawer.Screen>
    </Drawer.Navigator>
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

export default connect(mapStateToProps, mapDispatchToProps)(AppDrawer);
