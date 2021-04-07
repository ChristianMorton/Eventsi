import React, { useState, useEffect } from "react";
import { StyleSheet, View, ActivityIndicator } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import Firebase from "./src/config/Firebase";
import { getUser } from "./src/redux/actions/user";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunkMiddleware from "redux-thunk";
import reducer from "./src/redux/reducers";
import AuthenticationNavigator from "./src/navigation/AuthenticationStack";
import AppDrawer from "./src/navigation/AppDrawer";

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
    const user = Firebase.auth().currentUser;
    if (user) {
      console.log("User is signed in");
      setUserLoggedIn("loggedIn");
      store.dispatch(getUser(user.uid));
    } else {
      console.log("User is not signed in");
      setUserLoggedIn("loggedOut");
    }
  };

  const updateAuthState = (isUserLoggedInVariable) => {
    setUserLoggedIn(isUserLoggedInVariable);
  };

  useEffect(() => {
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
