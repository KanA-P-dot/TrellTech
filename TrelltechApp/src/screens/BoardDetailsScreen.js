import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, ActivityIndicator, TextInput, Button, TouchableOpacity } from "react-native";
import TrelloService from "../services/trelloService";

const BoardDetailsScreen = ({ route, navigation }) => {
  const { boardId, boardName } = route.params;
  const [lists, setLists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newListName, setNewListName] = useState("");

  useEffect(() => {
    const fetchLists = async () => {
      const data = await TrelloService.getLists(boardId);
      setLists(data);
      setLoading(false);
    };
    fetchLists();
  }, [boardId]);

  const handleAddList = async () => {
    if (newListName.trim() === "") return;
    const newList = await TrelloService.addList(boardId, newListName);
    if (newList) {
      setLists([...lists, newList]);
      setNewListName("");
    }
  };

  const handleDeleteList = async (listId) => {
    const result = await TrelloService.deleteList(listId);
    if (result) {
      setLists(lists.filter((list) => list.id !== listId)); // Suppression de la liste localement
    }
  };

  const handleUpdateList = async () => {
    if (updatedListName.trim() === "" || !editingListId) return;

    const updatedList = await TrelloService.updateList(editingListId, updatedListName);

    if (updatedList) {
      setLists(lists.map(list =>
        list.id === editingListId ? { ...list, name: updatedListName } : list
      ));
      setEditingListId(null); // Ferme le mode d'édition
      setUpdatedListName(""); // Reset du champ
    }
  };

  const [editingListId, setEditingListId] = useState(null);
  const [updatedListName, setUpdatedListName] = useState("");



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
          <View style={styles.listItemContainer}>
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

            <TouchableOpacity
              style={styles.deleteIcon}
              onPress={() => {
                setEditingListId(item.id);
                setUpdatedListName(item.name);
              }}
            >
              <Text style={styles.deleteText}>✏️</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.deleteIcon}
              onPress={() => handleDeleteList(item.id)}
            >
              <Text style={styles.deleteText}>🗑️</Text> {/* Emoji poubelle */}
            </TouchableOpacity>
          </View>
        )}
      />

      {editingListId && (
        <View style={styles.editContainer}>
          <TextInput
            style={styles.input}
            placeholder="Nouveau nom de la liste"
            value={updatedListName}
            onChangeText={setUpdatedListName}
          />
          <Button title="Modifier" onPress={handleUpdateList} />
          <Button title="Annuler" color="red" onPress={() => setEditingListId(null)} />
        </View>
      )}

      <View style={styles.addListContainer}>
        <TextInput
          style={styles.input}
          placeholder="Nom de la liste"
          value={newListName}
          onChangeText={setNewListName}
        />
        <Button title="Ajouter Liste" onPress={handleAddList} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f8f9fa" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 10, textAlign: "center" },
  listItemContainer: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  listItem: { padding: 15, marginVertical: 8, backgroundColor: "#fff", borderRadius: 10, elevation: 3, flex: 1 },
  listName: { fontSize: 18, fontWeight: "bold", color: "#333" },
  deleteIcon: { padding: 10 },
  deleteText: { fontSize: 20, color: "red" },
  addListContainer: { marginTop: 20 },
  input: { height: 40, borderColor: "#ccc", borderWidth: 1, borderRadius: 5, paddingHorizontal: 10, marginBottom: 10 },
});

export default BoardDetailsScreen;
