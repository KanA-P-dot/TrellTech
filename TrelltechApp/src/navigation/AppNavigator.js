import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "../screens/HomeScreen";
import WorkspacesScreen from "../screens/WorkspacesScreen";
import WorkspaceDetailsScreen from "../screens/WorkspaceDetailsScreen";
import BoardDetailsScreen from "../screens/BoardDetailsScreen";
import ListDetailsScreen from "../screens/ListDetailsScreen";
import CardDetailsScreen from "../screens/CardDetailsScreen";

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Workspaces" component={WorkspacesScreen} />
      <Stack.Screen name="WorkspaceDetails" component={WorkspaceDetailsScreen} />
      <Stack.Screen name="BoardDetails" component={BoardDetailsScreen} />
      <Stack.Screen name="ListDetails" component={ListDetailsScreen} />
      <Stack.Screen name="CardDetails" component={CardDetailsScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
