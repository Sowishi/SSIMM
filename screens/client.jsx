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
import TransactionCard from "../components/transactionCard";
import CircleDisplay from "../components/circleDisplay";

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
            style={{
              fontFamily: "Kanit",
              marginLeft: 5,
              fontWeight: "bold",
              fontSize: 15,
              width: 200,
            }}
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
            fontSize: 20,
            marginBottom: 10,
            color: "#00AED1",
          }}
        >
          Available Balance
        </Text>
        <CircleDisplay />
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
        <TransactionCard />
      </View>
    </View>
  );
};

export default Client;
