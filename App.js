import "react-native-gesture-handler";
import Login from "./screens/login";
import { createStackNavigator } from "@react-navigation/stack";
import Client from "./screens/client";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import Admin from "./screens/admin";
import Toast from "react-native-toast-message";
import { AuthContextProvider } from "./context/authContext";

import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import MS1 from "./screens/ms1";
import { Text } from "react-native";
import MS2 from "./screens/ms2";
import MS3 from "./screens/ms3";
import MS4 from "./screens/ms4";
import MS5 from "./screens/ms5";

const Stack = createStackNavigator();
const Tab = createMaterialTopTabNavigator();

function Main() {
  return (
    <Tab.Navigator
      tabBarPosition="bottom" // Set the tab bar to appear at the bottom
      screenOptions={{
        swipeEnabled: false,

        tabBarStyle: {
          backgroundColor: "#0D0E10",
          borderRadius: 10,
          marginBottom: 20,
          marginHorizontal: 20,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 3,
          },
          shadowOpacity: 0.27,
          shadowRadius: 4.65,
          elevation: 6,
          paddingVertical: 10,
        }, // Customize tab bar style
        tabBarIndicatorStyle: { backgroundColor: "blue", height: 0 }, // Customize indicator
      }}
    >
      <Tab.Screen
        options={{
          tabBarLabel: ({ focused }) => (
            <Text
              style={{
                color: focused ? "#00A854" : "white",
                fontSize: 15,
                fontWeight: "bold",
              }}
            >
              MS1
            </Text>
          ),
        }}
        name="ms1"
        component={MS1}
      />
      <Tab.Screen
        options={{
          tabBarLabel: ({ focused }) => (
            <Text
              style={{
                color: focused ? "#00A854" : "white",
                fontSize: 15,
                fontWeight: "bold",
              }}
            >
              MS2
            </Text>
          ),
        }}
        name="ms2"
        component={MS2}
      />
      <Tab.Screen
        options={{
          tabBarLabel: ({ focused }) => (
            <Text
              style={{
                color: focused ? "#00A854" : "white",
                fontSize: 15,
                fontWeight: "bold",
              }}
            >
              MS3
            </Text>
          ),
        }}
        name="ms3"
        component={MS3}
      />
      <Tab.Screen
        options={{
          tabBarLabel: ({ focused }) => (
            <Text
              style={{
                color: focused ? "#00A854" : "white",
                fontSize: 15,
                fontWeight: "bold",
              }}
            >
              MS4
            </Text>
          ),
        }}
        name="ms4"
        component={MS4}
      />
      <Tab.Screen
        options={{
          tabBarLabel: ({ focused }) => (
            <Text
              style={{
                color: focused ? "#00A854" : "white",
                fontSize: 15,
                fontWeight: "bold",
              }}
            >
              Angle
            </Text>
          ),
        }}
        name="ms5"
        component={MS5}
      />
    </Tab.Navigator>
  );
}

const App = () => {
  return (
    <>
      <AuthContextProvider>
        <StatusBar backgroundColor="#FBFFF5" />
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="login" component={Login} />
            <Stack.Screen name="home" component={Main} />
            <Stack.Screen name="admin" component={Admin} />
          </Stack.Navigator>
        </NavigationContainer>
        <Toast />
      </AuthContextProvider>
    </>
  );
};

export default App;
