import { Input } from "@rneui/themed";
import React, { FC } from "react";
import { StyleSheet, Text, View } from "react-native";

type formItemProps = {
  legend: string;
  inputValue: string;
  onChangeText: (text: string) => void;
};

const FormItem: FC<formItemProps> = ({ legend, inputValue, onChangeText }) => {
  return (
    <View style={styles.formItem}>
      <View style={styles.inputContainer}>
        <Input value={inputValue} onChangeText={onChangeText} />
      </View>
      <View style={styles.legendContainer}>
        <Text style={styles.legend}>{legend}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  formItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  inputContainer: {
    flex: 3,
  },
  legendContainer: {
    flex: 1,
  },
  legend: {
    fontWeight: "500",
  },
});

export default FormItem;
