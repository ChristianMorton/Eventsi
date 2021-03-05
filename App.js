import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import Firebase from "./src/config/Firebase";

import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunkMiddleware from "redux-thunk";
import reducer from "./src/redux/reducers";
import AppDrawer from "./src/navigation/AppDrawer";
import AuthenticationNavigator from "./src/navigation/AuthenticationStack";

const middleware = applyMiddleware(thunkMiddleware);
const store = createStore(reducer, middleware);

const Initializing = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" color="tomato" />
    </View>
  );
};

const App = () => {
  const [isUserLoggedIn, setUserLoggedIn] = useState("initializing");

  useEffect(() => {
    checkAuthState();
  }, []);

  const checkAuthState = async () => {
    try {
      await Firebase.auth().currentUser;
      console.log("User is signed in");
      setUserLoggedIn("loggedIn");
    } catch (err) {
      console.log("User is not signed in");
      setUserLoggedIn("loggedOut");
    }
  };

  const updateAuthState = (isUserLoggedIn) => {
    setUserLoggedIn(isUserLoggedIn);
  };

  return (
    <Provider store={store}>
      <NavigationContainer>
        {isUserLoggedIn === "initializing" && <Initializing />}
        {isUserLoggedIn === "loggedIn" && (
          <AppDrawer updateAuthState={updateAuthState} />
        )}
        {isUserLoggedIn === "loggedOut" && (
          <AuthenticationNavigator updateAuthState={updateAuthState} />
        )}
      </NavigationContainer>
    </Provider>
  );
};

const styles = StyleSheet.create({});

export default App;
