import "react-native-gesture-handler";

import { Text } from "react-native";
import Login from "./screens/login";
import { createStackNavigator } from "@react-navigation/stack";
import Client from "./screens/client";
import { NavigationContainer } from "@react-navigation/native";

const Stack = createStackNavigator();

const App = () => {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="login" component={Login} />
          <Stack.Screen name="client" component={Client} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default App;
