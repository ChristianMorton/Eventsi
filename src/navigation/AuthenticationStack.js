import React, { useEffect } from "react";
import SignIn from "../screens/AuthFlow/SignInScreen";
import SignUp from "../screens/AuthFlow/SignUpScreen";
import ConfirmSignUp from "../screens/AuthFlow/ConfirmSignUp";
import { createStackNavigator } from "@react-navigation/stack";
import Firebase from "../config/Firebase";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
  updateEmail,
  updatePassword,
  login,
  getUser,
} from "../redux/actions/user";

const AuthenticationStack = createStackNavigator();
const AuthenticationNavigator = ({ updateAuthState, getUser }) => {
  useEffect(() => {
    const cUser = Firebase.auth().currentUser;
    if (cUser) {
      getUser(cUser.uid);
      if (cUser != null) {
        updateAuthState("loggedIn");
      }
    } else {
      updateAuthState("loggedOut");
    }
    Firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        getUser(user.uid);
        if (user != null) {
          updateAuthState("loggedIn");
        }
      } else {
        updateAuthState("loggedOut");
      }
    });
  }, []);

  return (
    <AuthenticationStack.Navigator headerMode="none">
      <AuthenticationStack.Screen name="SignIn">
        {(screenProps) => (
          <SignIn {...screenProps} updateAuthState={updateAuthState} />
        )}
      </AuthenticationStack.Screen>
      <AuthenticationStack.Screen name="SignUp" component={SignUp} />
      <AuthenticationStack.Screen
        name="ConfirmSignUp"
        component={ConfirmSignUp}
      />
    </AuthenticationStack.Navigator>
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthenticationNavigator);
