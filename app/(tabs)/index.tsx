import { StyleSheet, View } from "react-native";
import HomeScreen from "../pages/HomeScreen";

export default function App() {
  return (
    <View>
      <HomeScreen />
    </View>
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
