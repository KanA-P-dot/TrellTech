import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from "react-native";
import TrelloService from "../services/trelloService";

const ListDetailsScreen = ({ route }) => {
  const { listId, listName } = route.params;
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCards = async () => {
      const data = await TrelloService.getCards(listId);
      setCards(data);
      setLoading(false);
    };
    fetchCards();
  }, [listId]);

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
          <View style={styles.cardItem}>
            <Text style={styles.cardName}>{item.name}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f8f9fa" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 10, textAlign: "center" },
  cardItem: { padding: 15, marginVertical: 8, backgroundColor: "#fff", borderRadius: 10, elevation: 3 },
  cardName: { fontSize: 18, fontWeight: "bold", color: "#333" },
});

export default ListDetailsScreen;
