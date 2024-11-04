import FormItem from "@/components/FormItem/FormItem";
import useFoodStorage from "@/hooks/useFoodStorage";
import { Button, Icon } from "@rneui/themed";
import React, { FC, useEffect, useState } from "react";
import { Modal, StyleSheet, View } from "react-native";
import CustomButton from "../CustomButton";

type addFoodModalProps = {
  onClose: (shouldUpdate?: boolean) => void;
  visible: boolean;
};

const AddFoodModal: FC<addFoodModalProps> = ({ onClose, visible }) => {
  const [calories, setCalories] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [portion, setPortion] = useState<string>("");
  const { onSaveFood } = useFoodStorage();

  const clearForm = () => {
    setCalories("");
    setName("");
    setPortion("");
  };

  useEffect(() => {
    clearForm();
  }, [visible]);

  const handleSubmit = async () => {
    try {
      await onSaveFood({ calories, name, portion });

      onClose(true);
    } catch (error) {
      // task: show error into modal
      console.error(error);
    }
  };

  return (
    <Modal visible={visible} onRequestClose={() => onClose()} transparent animationType="slide">
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.closeContainer}>
            <Button icon={<Icon name="close" size={28} />} onPress={() => onClose()} type="clear" />
          </View>
          <FormItem
            legend="CAL"
            inputValue={calories}
            onChangeText={(text: string) => {
              setCalories(text);
            }}
          />
          <FormItem
            legend="Nombre"
            inputValue={name}
            onChangeText={(text: string) => {
              setName(text);
            }}
          />
          <FormItem
            legend="Porción (g)"
            inputValue={portion}
            onChangeText={(text: string) => {
              setPortion(text);
            }}
          />
          <View style={styles.addBtnModalContainer}>
            <CustomButton
              title="Add"
              icon="add"
              color="#fff"
              onPress={handleSubmit}
              disabled={calories.trim() === "" || name.trim() === "" || portion.trim() === ""}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.6)",
  },
  content: {
    width: "75%",
    backgroundColor: "#fff",
    padding: 18,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  closeContainer: {
    alignItems: "flex-end",
  },
  addBtnModalContainer: {
    alignItems: "flex-end",
  },
});

export default AddFoodModal;
