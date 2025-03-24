import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import TrelloService from "../services/trelloService";

const CardDetailsScreen = ({ route }) => {
  const { cardId, cardName } = route.params;
  const [card, setCard] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCardDetails = async () => {
      const data = await TrelloService.getCardDetails(cardId);
      setCard(data);
      setLoading(false);
    };
    fetchCardDetails();
  }, [cardId]);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text>Chargement des détails...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{card.name}</Text>
      <Text style={styles.description}>{card.desc || "Pas de description"}</Text>
      <Text style={styles.date}>
        Date limite : {card.due ? new Date(card.due).toLocaleDateString() : "Non définie"}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f8f9fa" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 10, textAlign: "center" },
  description: { fontSize: 16, color: "#333", marginBottom: 10 },
  date: { fontSize: 16, fontStyle: "italic", color: "#555" },
});

export default CardDetailsScreen;
