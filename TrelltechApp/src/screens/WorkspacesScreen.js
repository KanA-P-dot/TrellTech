import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import TrelloService from "../services/trelloService";

const WorkspacesScreen = () => {
  const [workspaces, setWorkspaces] = useState([]);

  useEffect(() => {
    const fetchWorkspaces = async () => {
      const data = await TrelloService.getWorkspaces();
      setWorkspaces(data);
    };
    fetchWorkspaces();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mes Workspaces</Text>
      <FlatList
        data={workspaces}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Text style={styles.workspace}>{item.displayName}</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
  workspace: { fontSize: 18, marginBottom: 5 },
});

export default WorkspacesScreen;
