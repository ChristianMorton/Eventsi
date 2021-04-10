import React from "react";
import { storiesOf } from "@storybook/react-native";
import UpcomingEventPanel from "../../../src/components/UpcomingEventPanel";
import { View } from "react-native";

storiesOf("Upcoming event panel", module)
  .addDecorator((story) => (
    <View
      style={{ height: 120, width: "90%", alignSelf: "center", marginTop: 30 }}
    >
      {story()}
    </View>
  ))
  .add("default", () => <UpcomingEventPanel />);
