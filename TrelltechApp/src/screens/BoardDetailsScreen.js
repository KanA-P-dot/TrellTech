import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from "react-native";
import TrelloService from "../services/trelloService";
import { TouchableOpacity } from "react-native"; 

const BoardDetailsScreen = ({ route, navigation}) => {
  const { boardId, boardName } = route.params;
  const [lists, setLists] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLists = async () => {
      const data = await TrelloService.getLists(boardId);
      setLists(data);
      setLoading(false);
    };
    fetchLists();
  }, [boardId]);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text>Chargement des listes...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Listes de {boardName}</Text>
      <FlatList
        data={lists}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.listItem}
            onPress={() =>
              navigation.navigate("ListDetails", {
                listId: item.id,
                listName: item.name,
              })
            }
          >
            <Text style={styles.listName}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f8f9fa" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 10, textAlign: "center" },
  listItem: { padding: 15, marginVertical: 8, backgroundColor: "#fff", borderRadius: 10, elevation: 3 },
  listName: { fontSize: 18, fontWeight: "bold", color: "#333" },
});

export default BoardDetailsScreen;
