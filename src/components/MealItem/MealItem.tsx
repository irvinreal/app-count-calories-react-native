import { Button, Icon } from "@rneui/themed";
import React, { FC } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";

import { colors } from "@/consts/colors";
import useFoodStorage from "@/hooks/useFoodStorage";
import { Meal } from "@/types";

type MealItemProps = Meal & {
  isAbleToAdd?: boolean;
  onCompleteAddRemove?: () => void;
  itemPosition?: number;
};

const MealItem: FC<MealItemProps> = ({
  calories,
  name,
  portion,
  isAbleToAdd,
  onCompleteAddRemove,
  itemPosition,
}) => {
  const { onSaveTodayFood, onDeleteTodayFood } = useFoodStorage();
  async function handleIconItemPress() {
    try {
      if (isAbleToAdd) {
        await onSaveTodayFood({ calories, name, portion });
        Alert.alert("Food added.");
      } else {
        await onDeleteTodayFood(itemPosition ?? -1);
        Alert.alert("Meal deleted.");
      }
      onCompleteAddRemove?.();
    } catch (error) {
      console.error(error);
      Alert.alert("Couldn't add.");
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.portion}>{portion}gr</Text>
      </View>
      <View style={styles.rightContainer}>
        <Button
          icon={<Icon name={isAbleToAdd ? "add-circle-outline" : "close"} />}
          type="clear"
          style={styles.iconButton}
          onPress={handleIconItemPress}
        />
        <Text style={styles.calories}>{calories} cal</Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.ligthGreen,
    borderRadius: 14,
    padding: 12,
    marginBottom: 12,
    flexDirection: "row",
  },
  leftContainer: {
    flex: 1,
    justifyContent: "center",
  },
  rightContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-end",
  },
  name: {
    fontSize: 18,
    fontWeight: "500",
  },
  portion: {
    fontSize: 13,
    color: colors.gray,
    fontWeight: "500",
  },
  calories: {
    fontSize: 18,
  },
  iconButton: {
    marginBottom: -8,
  },
});

export default MealItem;
