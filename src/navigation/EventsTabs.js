import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import ChatTab from "../components/ChatTab";
import DetailsTab from "../components/DetailsTab";
import GalleryComponent from "../components/GalleryComponent";
import PostsTab from "../components/PostsTab";

const Tab = createMaterialTopTabNavigator();

const EventsTabs = ({ id }) => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Gallery">
        {(screenProps) => <GalleryComponent {...screenProps} id={id} />}
      </Tab.Screen>
      <Tab.Screen name="Posts">
        {(screenProps) => <PostsTab {...screenProps} id={id} />}
      </Tab.Screen>
      <Tab.Screen name="Details">
        {(screenProps) => <DetailsTab {...screenProps} id={id} />}
      </Tab.Screen>
      <Tab.Screen name="Chat">
        {(screenProps) => <ChatTab {...screenProps} id={id} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

export default EventsTabs;
