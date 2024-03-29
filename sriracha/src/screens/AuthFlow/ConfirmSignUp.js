import React, { useState } from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import { Auth } from "aws-amplify";
import AppTextInput from "../../components/AppTextInput";
import AppButton from "../../components/AppButton";

const ConfirmSignUp = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [authCode, setAuthCode] = useState("");

  const confirmSignUp = async () => {
    try {
      await Auth.confirmSignUp(username, authCode);
      console.log("Code confirmed");
      navigation.navigate("SignIn");
    } catch (error) {
      console.log(
        " Verification code does not match. Please enter a valid verification code.",
        error.code
      );
    }
  };

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Confirm sign up</Text>
        <AppTextInput
          value={username}
          onChangeText={(text) => setUsername(text)}
          leftIcon="account"
          placeholder="Enter Username"
          autoCapitalize="none"
          keyboardType="email-address"
          textContentType="emailAddress"
        />
        <AppTextInput
          value={authCode}
          onChangeText={(text) => setAuthCode(text)}
          leftIcon="numeric"
          placeholder="Enter verification code"
          keyboardType="numeric"
        />
        <AppButton title="Confirm Sign Up" onPress={confirmSignUp} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    color: "#202020",
    fontWeight: "500",
    marginVertical: 15,
  },
});

export default ConfirmSignUp;
