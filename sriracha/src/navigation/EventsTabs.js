import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import ChatTab from "../components/ChatTab";
import DetailsTab from "../components/DetailsTab";
import GalleryComponent from "../components/GalleryComponent";
import PostsTab from "../components/PostsTab";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const Tab = createMaterialTopTabNavigator();

const EventsTabs = ({
  id,
  RSVPTime,
  name,
  description,
  time,
  dressCode,
  Location,
  hasRSVP,
  chooseImage,
}) => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: "black",
        inactiveTintColor: "gray",
        showLabel: false,
        showIcon: true,
      }}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Details") {
            iconName = focused ? "information" : "information-outline";
          } else if (route.name === "Posts") {
            iconName = focused ? "note-multiple" : "note-multiple-outline";
          } else if (route.name === "Gallery") {
            iconName = focused ? "image-multiple" : "image-multiple-outline";
          } else if (route.name === "Chat") {
            iconName = focused ? "chat" : "chat-outline";
          }

          // You can return any component that you like here!
          return (
            <MaterialCommunityIcons name={iconName} color={color} size={20} />
          );
        },
      })}
    >
      <Tab.Screen name="Details">
        {(screenProps) => (
          <DetailsTab
            {...screenProps}
            id={id}
            RSVPTime={RSVPTime}
            name={name}
            description={description}
            time={time}
            dressCode={dressCode}
            Location={Location}
            hasRSVP={hasRSVP}
          />
        )}
      </Tab.Screen>
      <Tab.Screen name="Posts">
        {(screenProps) => <PostsTab {...screenProps} id={id} />}
      </Tab.Screen>
      <Tab.Screen name="Gallery">
        {(screenProps) => (
          <GalleryComponent
            {...screenProps}
            chooseImage={chooseImage}
            id={id}
          />
        )}
      </Tab.Screen>

      <Tab.Screen name="Chat">
        {(screenProps) => <ChatTab {...screenProps} id={id} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

export default EventsTabs;
