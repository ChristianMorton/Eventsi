import React from "react";
import { storiesOf } from "@storybook/react-native";
import AppTextInput from "../../../src/components/AppTextInput";
import { withKnobs, text } from "@storybook/addon-knobs";

storiesOf("AppTextInput", module)
  .addDecorator(withKnobs)
  .add("default", () => (
    <AppTextInput
      leftIcon={text("icon", "calendar")}
      title={text("title", "default")}
      placeholder={text("placeholder", "Input Text")}
    />
  ))
  .add("description", () => (
    <AppTextInput
      leftIcon={text("icon", "calendar")}
      title={text("title", "default")}
      placeholder={text("placeholder", "Input Text")}
      description={true}
    />
  ));
