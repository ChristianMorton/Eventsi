import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
  updateEmail,
  updatePassword,
  login,
  getUser,
} from "../redux/actions/user";
import { EventsNavigator } from "../navigation/EventsNavigator";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { View, Text, TouchableOpacity } from "react-native";
import FooterShapeSVG from "../components/shapes/FooterShapeSVG";
import JoinEventScreen from "../screens/JoinEventScreen";
import HostEventScreen from "../screens/HostEventScreen";
import ProfileScreen from "../screens/ProfileScreen";
import ChatScreen from "../screens/ChatScreen";

const Tab = createBottomTabNavigator();

const MyTabBar = ({ state, descriptors, navigation }) => {
  const focusedOptions = descriptors[state.routes[state.index].key].options;

  if (focusedOptions.tabBarVisible === false) {
    return null;
  }

  return (
    <>
      <FooterShapeSVG
        style={{
          bottom: 0,
          zIndex: 0,
          shadowColor: "rgba(0,0,0, .5)", // IOS
          shadowOffset: { height: 2, width: 2 }, // IOS
          shadowOpacity: 0.5, // IOS
          shadowRadius: 6, //IOS
          elevation: 5, // Android
        }}
      />
      <View style={{ flexDirection: "row", height: 70 }}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: "tabLongPress",
              target: route.key,
            });
          };

          return (
            <TouchableOpacity
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={{ flex: 1 }}
            >
              <Text style={{ color: isFocused ? "#673ab7" : "#222" }}>
                {label}
              </Text>
              {options.tabBarIcon(isFocused ? "#673ab7" : "#222")}
            </TouchableOpacity>
          );
        })}
      </View>
    </>
  );
};

const TabNavigator = ({ updateAuthState, getUser }) => {
  return (
    <Tab.Navigator>
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
          <EventsNavigator {...screenProps} updateAuthState={updateAuthState} />
        )}
      </Tab.Screen>
      <Tab.Screen
        options={{
          tabBarLabel: "Joined Events",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="calendar" color={color} size={size} />
          ),
        }}
        name="Joined Events"
      >
        {(screenProps) => (
          <JoinEventScreen {...screenProps} updateAuthState={updateAuthState} />
        )}
      </Tab.Screen>
      <Tab.Screen
        options={{
          tabBarLabel: "Create Event",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="plus-circle"
              color={color}
              size={size}
            />
          ),
        }}
        name="Create Event"
      >
        {(screenProps) => (
          <HostEventScreen {...screenProps} updateAuthState={updateAuthState} />
        )}
      </Tab.Screen>
      <Tab.Screen
        options={{
          tabBarLabel: "Chat",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="chat" color={color} size={size} />
          ),
        }}
        name="Chat"
      >
        {(screenProps) => (
          <ChatScreen {...screenProps} updateAuthState={updateAuthState} />
        )}
      </Tab.Screen>
      <Tab.Screen
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
        name="Profile"
      >
        {(screenProps) => (
          <ProfileScreen {...screenProps} updateAuthState={updateAuthState} />
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
