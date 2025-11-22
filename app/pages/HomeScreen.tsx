import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Welcome to React Native!</Text>
      <Text style={styles.subtitle}>Getting Started</Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>About This App</Text>
        <Text style={styles.text}>
          This is a simple React Native app with two main features:
        </Text>
        <Text style={styles.bulletPoint}>• Home page (you are here)</Text>
        <Text style={styles.bulletPoint}>• Todo List page</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Todo List Features</Text>
        <Text style={styles.text}>Navigate to the Todo tab to:</Text>
        <Text style={styles.bulletPoint}>• Add new tasks</Text>
        <Text style={styles.bulletPoint}>• Mark tasks as completed</Text>
        <Text style={styles.bulletPoint}>• Delete tasks</Text>
        <Text style={styles.bulletPoint}>• Track your progress</Text>
      </View>
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
  subtitle: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 20,
    color: "#666",
  },
  card: {
    backgroundColor: "#f9f9f9",
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#333",
  },
  text: {
    fontSize: 16,
    marginBottom: 8,
    color: "#555",
    lineHeight: 22,
  },
  bulletPoint: {
    fontSize: 16,
    marginBottom: 6,
    color: "#555",
    paddingLeft: 10,
  },
});
