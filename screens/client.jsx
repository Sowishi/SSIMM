import {
  Image,
  Linking,
  RefreshControl,
  ScrollView,
  Text,
  View,
} from "react-native";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import Constants from "expo-constants";
import { LinearGradient } from "expo-linear-gradient";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import LottieView from "lottie-react-native";
import { useContext, useEffect, useState } from "react";
import { SpeedDial } from "react-native-elements";
import { AuthContext } from "../context/authContext";
import { useFonts } from "expo-font";
import TransactionCard from "../components/transactionCard";
import AnimatedNumbers from "react-native-animated-numbers";
import useGetUsers from "../hooks/useGetUsers";
import Loading from "../components/loading";
import useGetTransaction from "../hooks/useGetTransaction";
import { Button } from "@rneui/themed";
import QRCode from "react-native-qrcode-svg";
import CustomModal from "../components/customModal";

const Client = ({ navigation }) => {
  const [open, setOpen] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const { user } = useContext(AuthContext);
  const { getUsers } = useGetUsers();
  const { getTransaction, transaction } = useGetTransaction();

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

  const onRefresh = () => {
    setTimeout(() => {
      getUsers();
    }, 2000);
  };

  useEffect(() => {
    getTransaction(user.id);
  }, []);

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      style={{
        flex: 1,
        backgroundColor: "#FBFFF5",
        marginTop: Constants.statusBarHeight,
      }}
    >
      <CustomModal
        modalAnimation="fade"
        height={500}
        open={open}
        handleClose={() => setOpen(false)}
      >
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          {/* <Text
            style={{
              fontSize: 30,
              fontFamily: "Kanit",
              fontWeight: "bold",
              marginBottom: 30,
            }}
          >
            Account QR Code
          </Text> */}
          <QRCode size={300} value={user.id} />
        </View>
      </CustomModal>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          margin: 25,
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
              marginLeft: 10,
              fontWeight: "bold",
              fontSize: 18,
              width: 200,
            }}
          >
            Good Morning, {user?.username}
          </Text>
        </View>
      </View>

      {/* Header       */}

      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <Text
          style={{
            fontFamily: "Kanit",
            fontSize: 20,
            color: "#00AED1",
          }}
        >
          Available Balance
        </Text>
        <AnimatedNumbers
          includeComma
          animateToNumber={user.balance}
          fontStyle={{ fontSize: 70, fontWeight: "bold", fontFamily: "Kanit" }}
        />
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          marginVertical: 10,
        }}
      >
        <Button
          onPress={() => setOpen(true)}
          style={{ width: 150, marginHorizontal: 10 }}
          buttonStyle={{ paddingVertical: 15, borderRadius: 10 }}
          ViewComponent={LinearGradient} // Don't forget this!
          linearGradientProps={{
            colors: ["#5A9AE6", "#7FDC67"],
            start: { x: 0, y: 0.5 },
            end: { x: 1, y: 0.5 },
          }}
        >
          <Text style={{ color: "white" }}>Buy</Text>
        </Button>
        <Button
          onPress={() => {
            navigation.navigate("login");
          }}
          style={{ width: 150, marginHorizontal: 10 }}
          buttonStyle={{ paddingVertical: 15, borderRadius: 10 }}
          ViewComponent={LinearGradient} // Don't forget this!
          linearGradientProps={{
            colors: ["#FF9800", "#F44336"],
            start: { x: 0, y: 0.5 },
            end: { x: 1, y: 0.5 },
          }}
        >
          <Text style={{ color: "white" }}>Switch Account</Text>
        </Button>
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

        {transaction?.map((item) => {
          return <TransactionCard item={item} />;
        })}
      </View>
    </ScrollView>
  );
};

export default Client;
