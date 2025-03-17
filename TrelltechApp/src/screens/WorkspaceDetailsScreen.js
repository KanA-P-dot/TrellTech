import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from "react-native";
import TrelloService from "../services/trelloService";
import { TouchableOpacity } from "react-native";

const WorkspaceDetailsScreen = ({ route, navigation }) => {
  const { workspaceId, workspaceName } = route.params;
  const [boards, setBoards] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBoards = async () => {
      const data = await TrelloService.getBoards(workspaceId);
      setBoards(data);
      setLoading(false);
    };
    fetchBoards();
  }, [workspaceId]);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text>Chargement des Tableaux...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tableaux de {workspaceName}</Text>
      <FlatList
        data={boards}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.boardItem}
            onPress={() =>
              navigation.navigate("BoardDetails", {
                boardId: item.id,
                boardName: item.name,
              })
            }
          >
            <Text style={styles.boardName}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f8f9fa" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 10, textAlign: "center" },
  boardItem: { padding: 15, marginVertical: 8, backgroundColor: "#fff", borderRadius: 10, elevation: 3 },
  boardName: { fontSize: 18, fontWeight: "bold", color: "#333" },
});

export default WorkspaceDetailsScreen;
