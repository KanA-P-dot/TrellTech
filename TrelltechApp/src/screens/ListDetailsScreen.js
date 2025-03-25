import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, ActivityIndicator, TextInput, Button, TouchableOpacity } from "react-native";
import TrelloService from "../services/trelloService";

const ListDetailsScreen = ({ route, navigation }) => {
  const { listId, listName } = route.params;
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newCardName, setNewCardName] = useState("");
  const [newCardDesc, setNewCardDesc] = useState("");

  useEffect(() => {
    const fetchCards = async () => {
      const data = await TrelloService.getCards(listId);
      setCards(data);
      setLoading(false);
    };
    fetchCards();
  }, [listId]);

  const handleAddCard = async () => {
    if (newCardName.trim() === "") return;
    const newCard = await TrelloService.addCard(listId, newCardName, newCardDesc);
    if (newCard) {
      setCards([...cards, newCard]); // Mise à jour de la liste des cartes
      setNewCardName("");
      setNewCardDesc("");
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text>Chargement des Cartes...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cartes de {listName}</Text>

      <FlatList
        data={cards}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.cardItem}
            onPress={() =>
              navigation.navigate("CardDetails", {
                cardId: item.id,
                cardName: item.name,
              })
            }
          >
            <Text style={styles.cardName}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />

      {/* Ajout de carte */}
      <View style={styles.addCardContainer}>
        <TextInput
          style={styles.input}
          placeholder="Nom de la carte"
          value={newCardName}
          onChangeText={setNewCardName}
        />
        <TextInput
          style={styles.input}
          placeholder="Description"
          value={newCardDesc}
          onChangeText={setNewCardDesc}
        />
        <Button title="Ajouter Carte" onPress={handleAddCard} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f8f9fa" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 10, textAlign: "center" },
  cardItem: { padding: 15, marginVertical: 8, backgroundColor: "#fff", borderRadius: 10, elevation: 3 },
  cardName: { fontSize: 18, fontWeight: "bold", color: "#333" },
  addCardContainer: { marginTop: 20, padding: 10, backgroundColor: "#fff", borderRadius: 10 },
  input: { height: 40, borderColor: "#ccc", borderWidth: 1, marginBottom: 10, paddingHorizontal: 10, borderRadius: 5 },
});

export default ListDetailsScreen;
