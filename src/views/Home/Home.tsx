import React, { useCallback, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import CustomButton from "@/components/CustomButton";
import Header from "@/components/Header";
import TodayCalories, { TodayCaloriesProps } from "@/components/TodayCalories";
import TodayMeals from "@/components/TodayMeals";
import useFoodStorage from "@/hooks/useFoodStorage";
import { Meal, RootStackParamList } from "@/types";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

const totalCaloriesPerDay = 2000;

function Home() {
  const [todayFood, setTodayFood] = useState<Meal[]>([]);
  const [todayStatistics, setTodayStatistics] = useState<TodayCaloriesProps>({
    consumed: 0,
    percentage: 0,
    remaining: 0,
  });
  const { onGetTodayFood } = useFoodStorage();
  const { navigate } = useNavigation<NativeStackNavigationProp<RootStackParamList, "Home">>();

  const calculateTodayStatistics = (meals: Meal[]) => {
    try {
      const caloriesConsumed = meals.reduce((acc, curr) => acc + Number(curr.calories), 0);
      const remainingCalories = totalCaloriesPerDay - caloriesConsumed;
      const percentage = (caloriesConsumed / totalCaloriesPerDay) * 100;

      setTodayStatistics({
        consumed: caloriesConsumed,
        percentage: Number(percentage),
        remaining: remainingCalories,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const loadTodayFood = useCallback(async () => {
    try {
      const todayFoodResponse = await onGetTodayFood();

      calculateTodayStatistics(todayFoodResponse);
      setTodayFood(todayFoodResponse);
    } catch (error) {
      setTodayFood([]);
      console.error(error);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadTodayFood().catch(null);
    }, [loadTodayFood]),
  );

  const handleAddCaloriesPress = () => {
    navigate("AddFood");
  };

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.caloriesContainer}>
        <View style={styles.leftContainer}>
          <Text style={styles.caloriesLegend}>Calories</Text>
        </View>
        <View style={styles.rightContainer}>
          <CustomButton onPress={handleAddCaloriesPress} />
        </View>
      </View>
      <TodayCalories {...todayStatistics} />
      <TodayMeals foods={todayFood} onCompleteAddRemove={() => loadTodayFood()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
    backgroundColor: "#fff",
    flex: 1,
  },
  leftContainer: {
    flex: 1,
    justifyContent: "center",
  },
  rightContainer: {
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "center",
  },
  caloriesContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 26,
  },
  caloriesLegend: {
    fontSize: 20,
  },
});

export default Home;
