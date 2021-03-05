import React, { useState } from "react";
import {
  View,
  Button,
  Platform,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

const DateTimeInput = ({ setDate, date, isDateOfEvent }) => {
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const showTimepicker = () => {
    showMode("time");
  };

  return (
    <View style={styles.container}>
      <View>
        <TouchableOpacity
          style={styles.touchableOpacity}
          onPress={showDatepicker}
        >
          <Text style={styles.dateInput}>
            {isDateOfEvent ? "Date of event" : "Reply by date"}:{"  "}
            {date.getDate()}/{date.getMonth() + 1}/
            {date.getYear() < 2000 ? date.getYear() + 1900 : date.getYear()}
          </Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity
          style={styles.touchableOpacity}
          onPress={showTimepicker}
        >
          <Text style={styles.dateInput}>
            {isDateOfEvent ? "Time of event" : "Reply by time"}:{"  "}
            {date.getHours() < 10 ? "0" + date.getHours() : date.getHours()}:
            {date.getMinutes() < 10
              ? "0" + date.getMinutes()
              : date.getMinutes()}
          </Text>
        </TouchableOpacity>
      </View>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  dateInput: {
    color: "black",
    fontSize: 18,
    fontWeight: "600",
  },
  safeAreaContainer: {
    flex: 1,
    backgroundColor: "white",
  },
  container: {
    flex: 1,
    alignItems: "center",
    //justifyContent: "center",
  },
  touchableOpacity: {
    marginVertical: 10,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    width: "80%",
    backgroundColor: "tomato",
  },
});

export default DateTimeInput;
