import { colors } from "@/consts/colors";
import { Button, Icon } from "@rneui/themed";
import React, { FC } from "react";
import { View } from "react-native";

type customButtonProps = {
  title?: string;
  icon?: string;
  color?: string;
  bgColor?: string;
  onPress?: () => void;
  disabled?: boolean;
};

const CustomButton: FC<customButtonProps> = ({
  title,
  icon,
  color,
  bgColor,
  onPress,
  disabled,
}) => {
  return (
    <View>
      <Button
        title={title}
        icon={
          <Icon
            name={icon !== undefined ? icon : "add-circle-outline"}
            color={color !== undefined ? color : "#fff"}
          />
        }
        radius="lg"
        color={bgColor !== undefined ? bgColor : colors.green}
        onPress={onPress !== undefined ? () => onPress() : undefined}
        disabled={disabled}
      />
    </View>
  );
};

export default CustomButton;
