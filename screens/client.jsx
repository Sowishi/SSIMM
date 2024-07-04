import { Image, Linking, ScrollView, Text, View } from "react-native";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import Constants from "expo-constants";
import { LinearGradient } from "expo-linear-gradient";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import LottieView from "lottie-react-native";
import { useContext, useState } from "react";
import { SpeedDial } from "react-native-elements";
import { AuthContext } from "../context/authContext";
import { useFonts } from "expo-font";

const Client = ({ navigation }) => {
  const [open, setOpen] = useState(false);
  const { user } = useContext(AuthContext);

  const [loaded, error] = useFonts({
    Kanit: require("../assets/Kanit-Regular.ttf"),
  });

  if (!loaded) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "white",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <LottieView
          autoPlay
          style={{ minWidth: 300, minHeight: 300 }}
          source={require("../assets/loading.json")}
        ></LottieView>
      </View>
    );
  }

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
          onPress={() => navigation.navigate("login")}
        />
      </SpeedDial>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          margin: 20,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            style={{ width: 45, height: 45 }}
            source={{ uri: user?.profilePic }}
          />
          <Text
            style={{ fontFamily: "Kanit", marginLeft: 5, fontWeight: "bold" }}
          >
            Good Morning, {user?.username}
          </Text>
        </View>
        <View>
          <FontAwesome5 name="bars" size={25} />
        </View>
      </View>

      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <Text
          style={{
            fontFamily: "Kanit",
            fontSize: 25,
            marginBottom: 10,
            color: "#00AED1",
          }}
        >
          Available Balance
        </Text>
        <AnimatedCircularProgress
          size={200}
          width={15}
          fill={70}
          tintColor="#F7A200"
          backgroundColor="gray"
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
                  fontFamily: "Kanit",
                }}
              >
                70 out of 100
              </Text>
            </>
          )}
        </AnimatedCircularProgress>
      </View>
      <View style={{ margin: 20 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text
            style={{ fontFamily: "Kanit", fontSize: 30, fontWeight: "bold" }}
          >
            Transactions
          </Text>
          <Text style={{ fontFamily: "Kanit", fontSize: 15, color: "gray" }}>
            view all
          </Text>
        </View>
        <View style={{ marginTop: 10 }}>
          <View
            style={{
              justifyContent: "space-between",
              alignItems: "center",
              flexDirection: "row",
              padding: 15,
              backgroundColor: "white",
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,

              elevation: 5,
              borderRadius: 20,
              marginVertical: 10,
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <FontAwesome5 name="lightbulb" size={30} color={"green"} />
              <View style={{ marginLeft: 10 }}>
                <Text
                  style={{
                    fontSize: 20,
                    fontFamily: "Kanit",
                    fontWeight: "bold",
                  }}
                >
                  Received
                </Text>
                <Text
                  style={{
                    fontSize: 15,
                    fontFamily: "Kanit",
                    color: "gray",
                  }}
                >
                  July 4, 2024
                </Text>
              </View>
            </View>
            <View>
              <Text
                style={{
                  fontSize: 20,
                  fontFamily: "Kanit",
                }}
              >
                +20 watts
              </Text>
            </View>
          </View>
          <View
            style={{
              justifyContent: "space-between",
              alignItems: "center",
              flexDirection: "row",
              padding: 15,
              backgroundColor: "white",
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,

              elevation: 5,
              borderRadius: 20,
              marginVertical: 10,
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <FontAwesome5 name="lightbulb" size={30} color={"green"} />
              <View style={{ marginLeft: 10 }}>
                <Text
                  style={{
                    fontSize: 20,
                    fontFamily: "Kanit",
                    fontWeight: "bold",
                  }}
                >
                  Received
                </Text>
                <Text
                  style={{
                    fontSize: 15,
                    fontFamily: "Kanit",
                    color: "gray",
                  }}
                >
                  July 4, 2024
                </Text>
              </View>
            </View>
            <View>
              <Text
                style={{
                  fontSize: 20,
                  fontFamily: "Kanit",
                }}
              >
                +20 watts
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Client;
