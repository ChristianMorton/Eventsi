import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView, Text, StyleSheet, Button } from "react-native";
import { Auth } from "aws-amplify";

const HomeScreen = ({ updateAuthState }) => {
  const [name, setName] = useState("");

  const signOut = async () => {
    try {
      await Auth.signOut();
      updateAuthState("loggedOut");
    } catch (error) {
      console.log("Error signing out", error);
    }
  };

  const getUser = async () => {
    try {
      const AuthUser = await Auth.currentAuthenticatedUser();
      setName(AuthUser.attributes.name);
    } catch (err) {
      console.log("Error getting user attributes", err);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <SafeAreaView>
      <Text>Hello {name}</Text>
      <StatusBar style="auto" />
      <Button title="Sign Out" color="tomato" onPress={signOut} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default HomeScreen;
