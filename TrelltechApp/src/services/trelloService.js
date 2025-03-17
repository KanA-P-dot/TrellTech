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
};

export default TrelloService;
