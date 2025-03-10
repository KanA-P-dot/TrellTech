import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from "react-native";
import TrelloService from "../services/trelloService";
import { TouchableOpacity } from "react-native"; 
import { useNavigation } from "@react-navigation/native";

const WorkspacesScreen = () => {
  const [workspaces, setWorkspaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation(); 

  useEffect(() => {
    const fetchWorkspaces = async () => {
      const data = await TrelloService.getWorkspaces();
      setWorkspaces(data);
      setLoading(false);
    };
    fetchWorkspaces();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text>Chargement des Workspaces...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mes Workspaces</Text>
      <FlatList
        data={workspaces}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.workspaceItem}
            onPress={() =>
              navigation.navigate("WorkspaceDetails", {
                workspaceId: item.id,
                workspaceName: item.displayName,
              })
            }
          >
            <Text style={styles.workspaceName}>{item.displayName}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f8f9fa" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 10, textAlign: "center" },
  workspaceItem: { padding: 15, marginVertical: 8, backgroundColor: "#fff", borderRadius: 10, elevation: 3 },
  workspaceName: { fontSize: 18, fontWeight: "bold", color: "#333" },
});

export default WorkspacesScreen;
