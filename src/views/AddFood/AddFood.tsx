import AddFoodModal from "@/components/AddFoodModal";
import CustomButton from "@/components/CustomButton";
import Header from "@/components/Header";
import MealItem from "@/components/MealItem";
import { colors } from "@/consts/colors";
import useFoodStorage from "@/hooks/useFoodStorage";
import { Meal } from "@/types";
import { Button, Input } from "@rneui/themed";
import React, { useEffect, useState } from "react";
import { Alert, ScrollView, StyleSheet, Text, View } from "react-native";

function AddFood() {
  const [visible, setVisible] = useState<boolean>(false);
  const [foods, setFoods] = useState<Meal[]>([]);
  const [search, setSearch] = useState<string>("");
  const { onGetFoods } = useFoodStorage();

  const loadFoods = async () => {
    try {
      const foodResponse = await onGetFoods();
      setFoods(foodResponse);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadFoods().catch(null);
    // Task: uptade list of MealItemsList by typing
  }, []);

  const handleModalClose = async (shouldUpdate?: boolean) => {
    if (shouldUpdate) {
      // Task: change alert using react native elements (custom modal)
      Alert.alert("Food saved successfully!");
      loadFoods();
    }

    setVisible(false);
  };

  const handleSearchPress = async () => {
    try {
      const result = await onGetFoods();
      setFoods(
        result.filter((item: Meal) =>
          item.name.toLocaleLowerCase().includes(search.toLocaleLowerCase()),
        ),
      );
    } catch (error) {
      console.error(error);
      setFoods([]);
    }
  };

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.addFoodContainer}>
        <View style={styles.legendContainer}>
          <Text style={styles.addFoodLegend}>Add Food</Text>
        </View>
        <View style={styles.addFoodBtnContainer}>
          <CustomButton onPress={() => setVisible(true)} />
        </View>
      </View>
      <View style={styles.searchContainer}>
        <View style={styles.inputContainer}>
          <Input
            placeholder="apples, pie, soda..."
            value={search}
            onChangeText={(text: string) => setSearch(text)}
          />
        </View>
        <Button
          title="Search"
          color={colors.ligthGreen}
          titleStyle={styles.searchBtnTitle}
          radius="lg"
          onPress={handleSearchPress}
        />
      </View>
      <ScrollView style={styles.content}>
        {foods?.map((meal) => (
          <MealItem key={`my-meal-item-${meal.name}`} {...meal} isAbleToAdd />
        ))}
      </ScrollView>
      <AddFoodModal visible={visible} onClose={handleModalClose} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
  },
  addFoodContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 24,
  },
  legendContainer: {
    flex: 1,
  },
  addFoodLegend: {
    fontSize: 20,
  },
  addFoodBtnContainer: {
    flex: 1,
    alignItems: "flex-end",
  },
  searchContainer: {
    flexDirection: "row",
  },
  inputContainer: {
    flex: 1,
    marginLeft: -10,
  },
  searchBtnTitle: {
    color: "#636363FF",
    fontSize: 14,
  },
  content: {},
});

export default AddFood;
