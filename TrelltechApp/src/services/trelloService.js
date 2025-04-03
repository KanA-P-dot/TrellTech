import axios from "axios";
import { TRELLO_API_KEY, TRELLO_TOKEN } from "@env";
console.log("TRELLO_API_KEY:", TRELLO_API_KEY);
console.log("TRELLO_TOKEN:", TRELLO_TOKEN);


const API_BASE_URL = "https://api.trello.com/1";

const TrelloService = {
  getBoards: async (workspaceId) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/organizations/${workspaceId}/boards?key=${TRELLO_API_KEY}&token=${TRELLO_TOKEN}`
      );
      return response.data;
    } catch (error) {
      console.error("Erreur lors de la récupération des Boards:", error);
      return [];
    }
  },

  getLists: async (boardId) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/boards/${boardId}/lists?key=${TRELLO_API_KEY}&token=${TRELLO_TOKEN}`
      );
      return response.data;
    } catch (error) {
      console.error("Erreur lors de la récupération des listes:", error);
      return [];
    }
  },

  addList: async (boardId, listName) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/lists?key=${TRELLO_API_KEY}&token=${TRELLO_TOKEN}`,
        {
          idBoard: boardId,
          name: listName,
        }
      );
      return response.data;
    } catch (error) {
      console.error("Erreur lors de l'ajout de la liste:", error);
      return null;
    }
  },

  deleteList: async (listId) => {
    try {
      const response = await axios.put(
        `${API_BASE_URL}/lists/${listId}?key=${TRELLO_API_KEY}&token=${TRELLO_TOKEN}`,
        {
          closed: true, // Archiver la liste en la fermant
        }
      );
      return response.data;
    } catch (error) {
      console.error("Erreur lors de l'archivage de la liste:", error);
      return null;
    }
  },

  updateList: async (listId, newName) => {
    try {
      const response = await axios.put(
        `${API_BASE_URL}/lists/${listId}?key=${TRELLO_API_KEY}&token=${TRELLO_TOKEN}`,
        {
          name: newName, // Nouveau nom de la liste
        }
      );
      return response.data;
    } catch (error) {
      console.error("Erreur lors de la mise à jour de la liste:", error);
      return null;
    }
  },
  

  

  getCardDetails: async (cardId) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/cards/${cardId}?key=${TRELLO_API_KEY}&token=${TRELLO_TOKEN}`
      );
      return response.data;
    } catch (error) {
      console.error("Erreur lors de la récupération de la carte:", error);
      return null;
    }
  },

  getWorkspaces: async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/members/me/organizations?key=${TRELLO_API_KEY}&token=${TRELLO_TOKEN}`
      );
      return response.data;
    } catch (error) {
      console.error("Erreur lors de la récupération des workspaces:", error);
    }
  },

  getCards: async (listId) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/lists/${listId}/cards?key=${TRELLO_API_KEY}&token=${TRELLO_TOKEN}`
      );
      return response.data;
    } catch (error) {
      console.error("Erreur lors de la récupération des cartes:", error);
      return [];
    }
  },

  addCard: async (listId, cardName, cardDesc = "") => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/cards?key=${TRELLO_API_KEY}&token=${TRELLO_TOKEN}`,
        {
          idList: listId,
          name: cardName,
          desc: cardDesc,
        }
      );
      return response.data;
    } catch (error) {
      console.error("Erreur lors de l'ajout de la carte:", error);
      return null;
    }
  },

  deleteCard: async (cardId) => {
    try {
      await axios.delete(
        `${API_BASE_URL}/cards/${cardId}?key=${TRELLO_API_KEY}&token=${TRELLO_TOKEN}`
      );
      return true; 
    } catch (error) {
      console.error("Erreur lors de la suppression de la carte:", error);
      return false;
    }
  },

  updateCard: async (cardId, newName, newDesc) => {
    try {
      const response = await axios.put(
        `${API_BASE_URL}/cards/${cardId}?key=${TRELLO_API_KEY}&token=${TRELLO_TOKEN}`,
        {
          name: newName,
          desc: newDesc,
        }
      );
      return response.data; 
    } catch (error) {
      console.error("Erreur lors de la mise à jour de la carte:", error);
      return null;
    }
  },



};

export default TrelloService;
