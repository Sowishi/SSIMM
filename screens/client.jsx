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

const Client = ({ navigation }) => {
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
    const dataRef = ref(db, "data");
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
    const parsedDate = moment(data.date, "DD MMM YYYY, HH:mm:ss");
    return { ...data, ["date"]: moment(parsedDate).format("LLL") };
  });

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#FBFFF5",
        marginTop: Constants.statusBarHeight,
      }}
    >
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
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("login");
            }}
            style={{
              backgroundColor: "red",
              paddingHorizontal: 10,
              paddingVertical: 5,
              borderRadius: 10,
            }}
          >
            <Text style={{ color: "white" }}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={{ flex: 1 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
            paddingVertical: 20,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              setCurrentFormat("hourly");
            }}
          >
            <View
              style={{
                backgroundColor: currentFormat == "hourly" ? "green" : "gray",
                paddingVertical: 5,
                paddingHorizontal: 10,
                borderRadius: 5,
              }}
            >
              <Text style={{ color: "white" }}>Hourly</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setCurrentFormat("daily");
            }}
          >
            <View
              style={{
                backgroundColor: currentFormat == "daily" ? "green" : "gray",
                paddingVertical: 5,
                paddingHorizontal: 10,
                borderRadius: 5,
              }}
            >
              <Text style={{ color: "white" }}>Daily</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setCurrentFormat("monthly");
            }}
          >
            <View
              style={{
                backgroundColor: currentFormat == "monthly" ? "green" : "gray",
                paddingVertical: 5,
                paddingHorizontal: 10,
                borderRadius: 5,
              }}
            >
              <Text style={{ color: "white" }}>Monthly</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setCurrentFormat("yearly");
            }}
          >
            <View
              style={{
                backgroundColor: currentFormat == "yearly" ? "green" : "gray",
                paddingVertical: 5,
                paddingHorizontal: 10,
                borderRadius: 5,
              }}
            >
              <Text style={{ color: "white" }}>Yearly</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <LineChart
            areaChart
            data={filterData}
            rotateLabel
            width={screenWidth - 40}
            height={280}
            spacing={10}
            hideDataPoints1
            color="#00ff83"
            thickness={2}
            startFillColor="rgba(20,105,81,0.3)"
            endFillColor="rgba(20,85,81,0.01)"
            startOpacity={0.9}
            endOpacity={0.2}
            initialSpacing={0}
            noOfSections={6}
            stepHeight={50}
            maxValue={600}
            yAxisColor="white"
            yAxisThickness={0}
            rulesType={ruleTypes.SOLID}
            rulesColor="gray"
            yAxisTextStyle={{ color: "gray" }}
            yAxisLabelPrefix=""
            yAxisTextNumberOfLines={2}
            // yAxisLabelWidth={40}
            // yAxisSide='right'
            xAxisColor="lightgray"
            pointerConfig={{
              pointerStripHeight: 160,
              pointerStripColor: "lightgray",
              pointerStripWidth: 2,
              pointerColor: "lightgray",
              radius: 6,
              pointerLabelWidth: 100,
              pointerLabelHeight: 90,
              // activatePointersOnLongPress: true,
              // autoAdjustPointerLabelPosition: false,
              pointerLabelComponent: (items) => {
                return (
                  <View
                    style={{
                      height: 90,
                      width: 100,
                      justifyContent: "center",
                      // marginTop: -30,
                      // marginLeft: -40,
                    }}
                  >
                    <Text
                      style={{
                        color: "black",
                        fontSize: 14,
                        marginBottom: 6,
                        textAlign: "center",
                      }}
                    >
                      {items[0].date}
                    </Text>

                    <View
                      style={{
                        paddingHorizontal: 14,
                        paddingVertical: 6,
                        borderRadius: 16,
                        backgroundColor: "black",
                      }}
                    >
                      <Text
                        style={{
                          fontWeight: "bold",
                          textAlign: "center",
                          color: "white",
                        }}
                      >
                        {"" + items[0].value + ".0"}
                      </Text>
                    </View>
                  </View>
                );
              },
            }}
          />

          <BarChart
            showFractionalValues
            showYAxisIndices
            noOfSections={4}
            maxValue={400}
            data={filterData}
            barWidth={40}
            sideWidth={15}
            isThreeD
            side="right"
            sectionColors="blue"
          />
        </View>
      </View>
    </View>
  );
};

export default Client;
