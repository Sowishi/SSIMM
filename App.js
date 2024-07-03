import "react-native-gesture-handler";
import Login from "./screens/login";
import { createStackNavigator } from "@react-navigation/stack";
import Client from "./screens/client";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import Admin from "./screens/admin";
import Toast from "react-native-toast-message";
import { AuthContextProvider } from "./context/authContext";

const Stack = createStackNavigator();

const App = () => {
  return (
    <>
      <AuthContextProvider>
        <StatusBar backgroundColor="#FBFFF5" />
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="login" component={Login} />
            <Stack.Screen name="client" component={Client} />
            <Stack.Screen name="admin" component={Admin} />
          </Stack.Navigator>
        </NavigationContainer>
        <Toast />
      </AuthContextProvider>
    </>
  );
};

export default App;
