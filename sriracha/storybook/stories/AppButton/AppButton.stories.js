import React from "react";
import { storiesOf } from "@storybook/react-native";
import AppButton from "../../../src/components/AppButton";
import { withKnobs, text } from "@storybook/addon-knobs";

storiesOf("AppButton", module)
  .addDecorator(withKnobs)
  .add("default", () => <AppButton title={text("title", "default")} />);
