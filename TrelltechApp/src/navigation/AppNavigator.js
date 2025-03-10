import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen";
import WorkspacesScreen from "../screens/WorkspacesScreen";
import WorkspaceDetailsScreen from "../screens/WorkspaceDetailsScreen";

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Workspaces" component={WorkspacesScreen} />
      <Stack.Screen name="WorkspaceDetails" component={WorkspaceDetailsScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
