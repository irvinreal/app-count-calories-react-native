import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

import { Button, Icon } from "@rneui/themed";

const staticInfo = {
  name: "Irvin Real",
  uri: "https://irvinreal.github.io/irvin-landing/imgs/irvin-foto-transparente.png",
};

export default function Header() {
  const { canGoBack, goBack } = useNavigation();
  return (
    <View style={styles.container}>
      {canGoBack() ? (
        <View style={styles.arrowContainer}>
          <Button
            icon={<Icon name="arrow-back" size={24} />}
            type="clear"
            onPress={() => goBack()}
          />
        </View>
      ) : undefined}
      <View style={styles.leftContainer}>
        <Text style={styles.name}>{`Hello ${staticInfo.name}`}</Text>
        <Text style={styles.welcomeText}>Welcome back to your goal</Text>
      </View>
      <View style={styles.rightContainer}>
        <Image source={{ uri: staticInfo.uri }} style={styles.profileImage} />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
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
  name: {
    fontWeight: "bold",
    fontSize: 14,
  },
  welcomeText: {
    fontSize: 12,
    color: "#808080",
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "gray",
  },
  arrowContainer: {
    marginLeft: -12,
  },
});
