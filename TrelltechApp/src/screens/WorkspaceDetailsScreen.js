import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, ActivityIndicator, TextInput, Button, Alert, TouchableOpacity } from "react-native";
import TrelloService from "../services/trelloService";

const WorkspaceDetailsScreen = ({ route, navigation }) => {
  const { workspaceId, workspaceName } = route.params;
  const [boards, setBoards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newBoardName, setNewBoardName] = useState("");
  const [editingBoardId, setEditingBoardId] = useState(null);
  const [editingBoardName, setEditingBoardName] = useState("");

  useEffect(() => {
    const fetchBoards = async () => {
      const data = await TrelloService.getBoards(workspaceId);
      setBoards(data);
      setLoading(false);
    };
    fetchBoards();
  }, [workspaceId]);

  const handleCreateBoard = async () => {
    if (newBoardName.trim()) {
      try {
        const newBoard = await TrelloService.createBoard(workspaceId, newBoardName);
        setBoards([...boards, newBoard]);
        setNewBoardName("");
      } catch (error) {
        Alert.alert("Erreur", "Une erreur s'est produite lors de la création du tableau.");
      }
    } else {
      Alert.alert("Erreur", "Veuillez entrer un nom valide pour le tableau.");
    }
  };

  const handleUpdateBoard = async () => {
    if (editingBoardName.trim() && editingBoardId !== null) {
      try {
        const updatedBoard = await TrelloService.updateBoard(editingBoardId, editingBoardName);
        // Met à jour le tableau localement avec le nom modifié
        setBoards(boards.map((board) => (board.id === editingBoardId ? updatedBoard : board)));
        // Réinitialise les champs d'édition
        setEditingBoardId(null);
        setEditingBoardName("");
      } catch (error) {
        Alert.alert("Erreur", "Une erreur s'est produite lors de la mise à jour du tableau.");
      }
    } else {
      Alert.alert("Erreur", "Veuillez entrer un nom valide pour le tableau.");
    }
  };

  const handleDeleteBoard = async (boardId) => {
    try {
      await TrelloService.deleteBoard(boardId);
      setBoards(boards.filter((board) => board.id !== boardId));
    } catch (error) {
      Alert.alert("Erreur", "Une erreur s'est produite lors de la suppression du tableau.");
    }
  };

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

      <TextInput
        style={styles.input}
        placeholder="Nom du nouveau tableau"
        value={newBoardName}
        onChangeText={setNewBoardName}
      />
      <Button title="Créer un Tableau" onPress={handleCreateBoard} />

      {/* Formulaire d'édition du tableau */}
      {editingBoardId && (
        <View style={styles.editContainer}>
          <TextInput
            style={styles.input}
            placeholder="Nom du tableau"
            value={editingBoardName}
            onChangeText={setEditingBoardName}
          />
          <Button title="Mettre à jour le Tableau" onPress={handleUpdateBoard} />
          <Button title="Annuler" color="red" onPress={() => setEditingBoardId(null)} />
        </View>
      )}

      <FlatList
        data={boards}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.boardItemContainer}>
            <View style={styles.boardItem}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("BoardDetails", {
                    boardId: item.id,
                    boardName: item.name,
                  })
                }
              >
                <Text style={styles.boardName}>{item.name}</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.actionsContainer}>
              <TouchableOpacity
                style={styles.editIcon}
                onPress={() => {
                  setEditingBoardId(item.id); // On met l'ID du tableau à modifier
                  setEditingBoardName(item.name); // On charge le nom du tableau dans l'input
                }}
              >
                <Text style={styles.editText}>✏️</Text> {/* Emoji pour modification */}
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.deleteIcon}
                onPress={() => handleDeleteBoard(item.id)}
              >
                <Text style={styles.deleteText}>🗑️</Text> {/* Emoji poubelle pour suppression */}
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f8f9fa" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 10, textAlign: "center" },
  boardItemContainer: { flexDirection: "row", alignItems: "center", marginBottom: 10 }, // Aligner horizontalement
  boardItem: { flex: 1, padding: 15, backgroundColor: "#fff", borderRadius: 10, elevation: 3 },
  boardName: { fontSize: 18, fontWeight: "bold", color: "#333" },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  editContainer: {
    marginBottom: 20,
  },
  actionsContainer: {
    flexDirection: "row", // Aligner les actions horizontalement
    justifyContent: "flex-end", // Aligner à droite
    alignItems: "center", // Aligner les boutons au centre
  },
  editIcon: { padding: 10 },
  deleteIcon: { padding: 10 },
  editText: { fontSize: 20, color: "#007AFF" }, // Couleur de l'emoji de modification
  deleteText: { fontSize: 20, color: "red" }, // Couleur de l'emoji de suppression
});

export default WorkspaceDetailsScreen;
