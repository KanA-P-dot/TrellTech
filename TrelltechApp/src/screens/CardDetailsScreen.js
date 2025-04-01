import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator, Button, Alert, TextInput } from "react-native";
import TrelloService from "../services/trelloService";

const CardDetailsScreen = ({ route, navigation }) => {
  const { cardId, cardName } = route.params;
  const [card, setCard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [newName, setNewName] = useState(cardName);
  const [newDesc, setNewDesc] = useState("");

  useEffect(() => {
    const fetchCardDetails = async () => {
      try {
        const data = await TrelloService.getCardDetails(cardId);
        setCard(data);
        setNewDesc(data?.desc || ""); // Initialiser la description si existante
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

  const handleUpdateCard = async () => {
    try {
      const updatedCard = await TrelloService.updateCard(cardId, newName, newDesc);
      if (updatedCard) {
        setCard(updatedCard);
        Alert.alert("Carte mise à jour !");
      } else {
        Alert.alert("Erreur lors de la mise à jour.");
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour :", error);
    }
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

      {/* Formulaire de mise à jour */}
      <TextInput
        style={styles.input}
        value={newName}
        onChangeText={setNewName}
        placeholder="Nouveau nom"
      />
      <TextInput
        style={styles.input}
        value={newDesc}
        onChangeText={setNewDesc}
        placeholder="Nouvelle description"
        multiline
      />

      <Button title="Modifier" onPress={handleUpdateCard} />
      <Button title="Supprimer Carte" color="red" onPress={handleDeleteCard} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f8f9fa" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 10, textAlign: "center" },
  description: { fontSize: 16, color: "#333", marginBottom: 10 },
  date: { fontSize: 16, fontStyle: "italic", color: "#555", marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    backgroundColor: "#fff",
  },
});

export default CardDetailsScreen;
