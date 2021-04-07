import React, { useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import AppTextInput from "../../components/AppTextInput";
import AppButton from "../../components/AppButton";
import Firebase from "../../config/Firebase";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
  updateEmail,
  updatePassword,
  login,
  getUser,
} from "../../redux/actions/user";
import { getEvent } from "../../redux/actions/events";

const SignIn = ({
  navigation,
  updateAuthState,
  user,
  updatePassword,
  updateEmail,
  login,
  getUser,
}) => {
  const signIn = async () => {
    login();
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
    <SafeAreaView style={styles.safeAreaContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Sign in to your account</Text>
        <AppTextInput
          value={user.email}
          onChangeText={(text) => updateEmail(text)}
          leftIcon="account"
          placeholder="Enter Email"
          autoCapitalize="none"
          keyboardType="email-address"
          textContentType="emailAddress"
        />
        <AppTextInput
          value={user.password}
          onChangeText={(text) => updatePassword(text)}
          leftIcon="lock"
          placeholder="Enter Password"
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry
          textContentType="password"
        />
        <AppButton title="Login" onPress={signIn} />
        <View style={styles.footerButtonContainer}>
          <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
            <Text style={styles.forgotPasswordButtonText}>
              Don't have an account yet? Sign Up
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.footerButtonContainer}>
          <TouchableOpacity
            onPress={() => navigation.navigate("ConfirmSignUp")}
          >
            <Text style={styles.forgotPasswordButtonText}>
              Got a verification code?
            </Text>
          </TouchableOpacity>
        </View>
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

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    { updateEmail, updatePassword, login, getUser, getEvent },
    dispatch
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
