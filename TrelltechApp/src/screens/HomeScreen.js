import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Bienvenue sur l'écran d'accueil</Text>
      <TouchableOpacity 
        style={styles.button} 
        onPress={() => navigation.navigate("Workspaces")}
      >
        <Text style={styles.buttonText}>Voir mes Workspaces</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e0f7fa", 
    padding: 20,
  },
  text: {
    fontSize: 24,
    fontWeight: "600",
    color: "#2c3e50", 
    marginBottom: 40,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#3498db", // Bleu
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6, 
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "500",
    color: "#fff",
    textAlign: "center",
  },
});

export default HomeScreen;
