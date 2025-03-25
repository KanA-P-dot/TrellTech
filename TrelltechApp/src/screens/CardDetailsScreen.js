import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator, Button, Alert } from "react-native";
import TrelloService from "../services/trelloService";

const CardDetailsScreen = ({ route, navigation }) => {
  const { cardId, cardName } = route.params;
  const [card, setCard] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCardDetails = async () => {
      try {
        const data = await TrelloService.getCardDetails(cardId);
        setCard(data);
      } catch (error) {
        console.error("Erreur lors du chargement de la carte :", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCardDetails();
  }, [cardId]);

  const handleDeleteCard = async () => {
    Alert.alert(
      "Supprimer la carte",
      "Es-tu sûr de vouloir supprimer cette carte ?",
      [
        { text: "Annuler", style: "cancel" },
        {
          text: "Supprimer",
          onPress: async () => {
            try {
              const success = await TrelloService.deleteCard(cardId);
              if (success) {
                Alert.alert("Carte supprimée !");
                navigation.goBack(); // Retour à la liste
              } else {
                Alert.alert("Erreur lors de la suppression.");
              }
            } catch (error) {
              console.error("Erreur lors de la suppression :", error);
            }
          },
        },
      ]
    );
  };

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
      <Text style={styles.title}>{card?.name || cardName}</Text>
      <Text style={styles.description}>{card?.desc || "Pas de description"}</Text>
      <Text style={styles.date}>
        Date limite : {card?.due ? new Date(card.due).toLocaleDateString() : "Non définie"}
      </Text>

      {/* Bouton de suppression */}
      <Button title="Supprimer Carte" color="red" onPress={handleDeleteCard} />
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
