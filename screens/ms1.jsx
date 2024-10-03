import {
  Image,
  Linking,
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Constants from "expo-constants";
import LottieView from "lottie-react-native";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/authContext";
import { useFonts } from "expo-font";
import {
  BarChart,
  LineChart,
  LineChartBicolor,
  PieChart,
  PopulationPyramid,
} from "react-native-gifted-charts";
import { ruleTypes } from "gifted-charts-core";
import { Dimensions } from "react-native";
import { onValue, ref } from "firebase/database";
import { db } from "../firebase";
import moment from "moment";
import Entypo from "@expo/vector-icons/Entypo";
import { color } from "@rneui/base";

const MS1 = ({ navigation }) => {
  const { user } = useContext(AuthContext);

  const [loaded, error] = useFonts({
    Kanit: require("../assets/Kanit-Regular.ttf"),
  });

  const screenWidth = Dimensions.get("window").width;

  const [currentFormat, setCurrentFormat] = useState("hourly");
  const [data, setData] = useState([]);

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

  const getData = () => {
    const dataRef = ref(db, "push");
    onValue(dataRef, (snapshot) => {
      const output = [];
      snapshot.forEach((doc) => {
        output.push({ ...doc.val(), id: doc.key });
      });
      setData(output);
    });
  };

  useEffect(() => {
    getData();
  }, []);

  const filterData = data.map((data) => {
    const timestamp = data.timestamp;
    const output = new Date(timestamp);
    const date = moment(output).format("MMM D, YYYY h:mm:ss A");

    return { label: date, date, value: data.MS1 };
  });

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#FAFAFA",
        marginTop: Constants.statusBarHeight,
      }}
    >
      {/* Header */}
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
          <View style={{ flexDirection: "row" }}>
            <Text
              style={{
                fontFamily: "Kanit",
                marginLeft: 10,
                fontWeight: "bold",
                fontSize: 18,
              }}
            >
              Good Morning, {user?.username}
            </Text>
            <Entypo name="chevron-right" size={30} color="#19B066" />
          </View>
        </View>
      </View>

      <ScrollView style={{ flex: 1 }}>
        <Text
          style={{
            textAlign: "center",
            fontSize: 25,
            fontWeight: "bold",
            marginBottom: 10,
            letterSpacing: 2,
          }}
        >
          Moisture Sensor 1
        </Text>
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "start",
          }}
        >
          <View
            style={{
              backgroundColor: "white",
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 1,
              },
              shadowOpacity: 0.18,
              shadowRadius: 1.0,

              elevation: 1,
              borderRadius: 10,
              marginBottom: 10,
              width: screenWidth - 30,
              justifyContent: "center",
              alignItems: "center",
              paddingVertical: 10,
            }}
          >
            <LineChart
              xAxisLabelTextStyle={{ color: "white" }}
              height={50}
              hideAxesAndRules
              areaChart
              stepChart
              hideDataPoints
              startFillColor="#0BA5A4"
              startOpacity={1}
              endOpacity={0.3}
              initialSpacing={0}
              data={filterData}
              spacing={30}
              thickness={5}
              hideRules
              hideYAxisText
              yAxisColor="#0BA5A4"
              showVerticalLines
              verticalLinesColor="rgba(14,164,164,0.5)"
              xAxisColor="#0BA5A4"
              color="#0BA5A4"
            />
          </View>
          <View
            style={{
              backgroundColor: "white",

              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              padding: 20,
              paddingBottom: 50,
              elevation: 1,
              borderRadius: 10,
              marginBottom: 20,
              width: screenWidth - 30,
            }}
          >
            <LineChart
              hideRules
              areaChart
              data={filterData}
              rotateLabel
              width={300}
              spacing={100}
              color="#00ff83"
              thickness={2}
              startFillColor="rgba(20,105,81,0.3)"
              endFillColor="rgba(20,85,81,0.01)"
              startOpacity={0.9}
              endOpacity={0.2}
              initialSpacing={20}
              noOfSections={6}
              stepHeight={50}
              height={300}
              yAxisColor="white"
              yAxisThickness={0}
              rulesType={ruleTypes.SOLID}
              rulesColor="gray"
              yAxisTextStyle={{ color: "gray" }}
              yAxisTextNumberOfLines={2}
              xAxisColor="lightgray"
              xAxisLabelTextStyle={{ fontSize: 8 }}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default MS1;
