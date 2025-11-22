import { useState } from "react";
import { Alert, Button, StyleSheet, Text, TextInput, View } from "react-native";

export default function HomeScreen() {
  const [user, setUser] = useState<{
    name: string;
    age: string;
    checkIn: boolean;
  }>({ name: "", age: "", checkIn: false });

  const [students, setStudents] = useState<Array<{
    name: string;
    age: string;
  }>>([
    { name: "Alice", age: "20" },
    { name: "Bob", age: "22" },
    { name: "Charlie", age: "19" },
  ]);

  const alertInputs = (name: string) => {
    setUser({ ...user, name });
    Alert.alert('Hello user',`Welcome to system ${user.name}!`);
  };

  return (
    <View style={styles.container}> 
      <View style={styles.section}>
        <Text style={styles.subtitle}>Name:</Text>
        <TextInput
          style={styles.input}
          placeholder="Set name..."
          onChangeText={(name) => setUser({ ...user, name })}
        />
        <Button title="Submit" onPress={() => alertInputs(user.name)} />
      </View>


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
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: 40,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    marginBottom: 8,
    color: "#333",
  },
  section: {
    marginTop: 20,
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    fontSize: 16,
  },
});
