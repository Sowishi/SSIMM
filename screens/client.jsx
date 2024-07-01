import { Linking, ScrollView, Text, View } from "react-native";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import Constants from "expo-constants";
import { LinearGradient } from "expo-linear-gradient";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import LottieView from "lottie-react-native";
import { useState } from "react";
import { SpeedDial } from "react-native-elements";

const Client = () => {
  const [open, setOpen] = useState(false);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#FBFFF5",
        marginTop: Constants.statusBarHeight,
      }}
    >
      <SpeedDial
        style={{ zIndex: 9999 }}
        isOpen={open}
        icon={{ name: "person", color: "#fff" }}
        openIcon={{ name: "close", color: "#fff" }}
        onOpen={() => setOpen(!open)}
        onClose={() => setOpen(!open)}
      >
        <SpeedDial.Action
          icon={{ name: "qr-code", color: "#fff" }}
          title="Show QR"
          onPress={() =>
            Linking.openURL(
              "https://www.facebook.com/profile.php?id=100073436105134"
            )
          }
        />
        <SpeedDial.Action
          icon={{ name: "logout", color: "#fff" }}
          title="Log out"
          onPress={() =>
            Linking.openURL(
              "https://www.facebook.com/profile.php?id=100073436105134"
            )
          }
        />
      </SpeedDial>

      <View style={{ flex: 1 }}>
        <LinearGradient
          colors={["#AC1457", "rgb(15,23,42)"]}
          style={{
            flex: 1,
            backgroundColor: "rgb(173,20,87)",
            margin: 25,
            borderRadius: 10,
            justifyContent: "flex-start",
            alignItems: "flex-start",
          }}
        >
          <View style={{ margin: 20 }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",
              }}
            >
              <FontAwesome5
                style={{ marginRight: 5 }}
                name="user"
                size={18}
                color="white"
              />
              <Text style={{ fontSize: 25, color: "white" }}>
                Jhon Michael Molina
              </Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",
              }}
            >
              <FontAwesome5
                style={{ marginRight: 5 }}
                name="phone"
                size={18}
                color="white"
              />
              <Text style={{ fontSize: 18, color: "white" }}>
                +639936170501
              </Text>
            </View>
          </View>
        </LinearGradient>
      </View>
      <View
        style={{
          flex: 1.5,
          backgroundColor: "white",
          marginTop: -110,
          marginHorizontal: 45,
          borderRadius: 5,
          justifyContent: "center",
          alignItems: "center",
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,

          elevation: 5,
        }}
      >
        <Text style={{ fontSize: 20, marginBottom: 15 }}>
          Remaining Balance
        </Text>
        <AnimatedCircularProgress
          size={200}
          width={15}
          fill={70}
          tintColor="#AC1457"
          backgroundColor="#AC145799"
        >
          {(fill) => (
            <>
              <LottieView
                autoPlay
                style={{ minWidth: 80, minHeight: 80 }}
                source={require("../assets/a.json")}
              ></LottieView>
              <Text
                style={{
                  fontSize: 15,
                  textAlign: "center",
                  fontWeight: "bold",
                }}
              >
                70 out of 100
              </Text>
            </>
          )}
        </AnimatedCircularProgress>
      </View>
      <ScrollView
        style={{
          flex: 1,
          marginHorizontal: 20,
          marginTop: 15,
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10 }}>
          Recent Transaction
        </Text>
        <View>
          <View
            style={{
              width: "100%",
              backgroundColor: "white",
              padding: 10,
              borderRadius: 5,
              marginVertical: 5,
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 1,
              },
              shadowOpacity: 0.2,
              shadowRadius: 1.41,

              elevation: 2,
            }}
          >
            <Text>100 Pesos Added to your account</Text>
            <Text>June 25, 2024</Text>
          </View>
          <View
            style={{
              width: "100%",
              backgroundColor: "white",
              padding: 10,
              borderRadius: 5,
              marginVertical: 5,
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 1,
              },
              shadowOpacity: 0.2,
              shadowRadius: 1.41,

              elevation: 2,
            }}
          >
            <Text>100 Pesos Added to your account</Text>
            <Text>June 25, 2024</Text>
          </View>
          <View
            style={{
              width: "100%",
              backgroundColor: "white",
              padding: 10,
              borderRadius: 5,
              marginVertical: 5,
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 1,
              },
              shadowOpacity: 0.2,
              shadowRadius: 1.41,

              elevation: 2,
            }}
          >
            <Text>100 Pesos Added to your account</Text>
            <Text>June 25, 2024</Text>
          </View>
          <View
            style={{
              width: "100%",
              backgroundColor: "white",
              padding: 10,
              borderRadius: 5,
              marginVertical: 5,
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 1,
              },
              shadowOpacity: 0.2,
              shadowRadius: 1.41,

              elevation: 2,
            }}
          >
            <Text>100 Pesos Added to your account</Text>
            <Text>June 25, 2024</Text>
          </View>
          <View
            style={{
              width: "100%",
              backgroundColor: "white",
              padding: 10,
              borderRadius: 5,
              marginVertical: 5,
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 1,
              },
              shadowOpacity: 0.2,
              shadowRadius: 1.41,

              elevation: 2,
            }}
          >
            <Text>100 Pesos Added to your account</Text>
            <Text>June 25, 2024</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Client;
