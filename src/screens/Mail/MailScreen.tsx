import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { COLORS } from "../../constants";
import theme from "../../styles/theme";

const MailScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Mail Screen</Text>
    </View>
  );
};

export default MailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.background,
  },
  text: {
    fontSize: theme.typography.fontSizes.lg,
    color: COLORS.text,
  },
});
