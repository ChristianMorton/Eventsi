import React from "react";
import { View, StyleSheet, Text, SafeAreaView } from "react-native";
import AppButton from "../components/AppButton";
import Firebase from '../config/Firebase'

const SettingsScreen = ({ navigation, updateAuthState }) => {
  const signOut = async () => {
    Firebase
      .auth()
      .signOut()
      .then(() => {
        console.log("Signed Out");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Would you like to log out?</Text>
        <AppButton title="Log out" onPress={signOut} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    backgroundColor: "white",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    color: "#202020",
    fontWeight: "500",
    marginVertical: 15,
  },
  footerButtonContainer: {
    marginVertical: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  forgotPasswordButtonText: {
    color: "tomato",
    fontSize: 18,
    fontWeight: "600",
  },
});

export default SettingsScreen;
