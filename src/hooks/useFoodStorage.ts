import { Meal } from "@/types";
import AsyncStorage from "@react-native-async-storage/async-storage";

const MY_FOOD_KEY = "@MyFood:Key";
const MY_TODAY_FOOD_KEY = "@MyTodayFood:Key";

const useFoodStorage = () => {
  async function saveInfoToStorage(storageKey: string, meal: Meal) {
    try {
      const currentSavedFood = await AsyncStorage.getItem(storageKey);

      if (currentSavedFood !== null) {
        const currentSavedFoodParsed = JSON.parse(currentSavedFood);
        currentSavedFoodParsed.push(meal);

        await AsyncStorage.setItem(storageKey, JSON.stringify(currentSavedFoodParsed));

        return Promise.resolve();
      }

      await AsyncStorage.setItem(storageKey, JSON.stringify([meal]));

      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async function getInfoFromStorage(storageKey: string): Promise<Meal[]> {
    try {
      const foods = await AsyncStorage.getItem(storageKey);

      if (foods === null) return [];

      const parsedFoods = JSON.parse(foods);
      if (!Array.isArray(parsedFoods)) throw new Error("Invalid format in stored data");

      return Promise.resolve(parsedFoods);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  // Method: Save Meals's information
  async function handleSaveFood({ calories, name, portion }: Meal) {
    try {
      const result = await saveInfoToStorage(MY_FOOD_KEY, { calories, name, portion });
      return Promise.resolve(result);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  // Method: Get Meals's information
  async function handleGetFoods() {
    return getInfoFromStorage(MY_FOOD_KEY);
  }

  // Method: Save today's Meals's information
  async function handleSaveTodayFood({ calories, name, portion }: Meal) {
    try {
      const result = await saveInfoToStorage(MY_TODAY_FOOD_KEY, {
        calories,
        name,
        portion,
        date: new Date().toISOString(),
      });
      return Promise.resolve(result);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async function handleGetTodayFood(): Promise<Meal[]> {
    return await getInfoFromStorage(MY_TODAY_FOOD_KEY);
  }

  async function handleRemoveTodayFood(index: number) {
    try {
      const todayFood = await handleGetTodayFood();
      const filteredItems = todayFood?.filter((item: Meal, itemIndex) => {
        return itemIndex !== index;
      });

      await AsyncStorage.setItem(MY_TODAY_FOOD_KEY, JSON.stringify(filteredItems));

      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  }

  return {
    onSaveFood: handleSaveFood,
    onGetFoods: handleGetFoods,
    onSaveTodayFood: handleSaveTodayFood,
    onGetTodayFood: handleGetTodayFood,
    onDeleteTodayFood: handleRemoveTodayFood,
  };
};

export default useFoodStorage;
