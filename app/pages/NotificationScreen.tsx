import { ScrollView, StyleSheet, Text } from "react-native";

export default function NotificationScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Notification</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: 40,
    color: "#333",
  },
});
