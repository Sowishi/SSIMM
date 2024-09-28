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

const Client = ({ navigation }) => {
  const { user } = useContext(AuthContext);

  const [loaded, error] = useFonts({
    Kanit: require("../assets/Kanit-Regular.ttf"),
  });

  const screenWidth = Dimensions.get("window").width;

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

  const ptData = [
    { value: 3, date: "1 Apr 2022" },
    { value: 180, date: "2 Apr 2022" },
    { value: 190, date: "3 Apr 2022" },
    { value: 180, date: "4 Apr 2022" },
    { value: 140, date: "5 Apr 2022" },
    { value: 145, date: "6 Apr 2022" },
    { value: 160, date: "7 Apr 2022" },
    { value: 200, date: "8 Apr 2022" },

    { value: 220, date: "9 Apr 2022" },
    {
      value: 240,
      date: "10 Apr 2022",
      label: "10 Apr",
      labelTextStyle: { color: "lightgray", width: 60 },
    },
    { value: 280, date: "11 Apr 2022" },
    { value: 260, date: "12 Apr 2022" },
    { value: 340, date: "13 Apr 2022" },
    { value: 385, date: "14 Apr 2022" },
    { value: 280, date: "15 Apr 2022" },
    { value: 390, date: "16 Apr 2022" },

    { value: 370, date: "17 Apr 2022" },
    { value: 285, date: "18 Apr 2022" },
    { value: 295, date: "19 Apr 2022" },
    {
      value: 300,
      date: "20 Apr 2022",
      label: "20 Apr",
      labelTextStyle: { color: "lightgray", width: 60 },
    },
    { value: 280, date: "21 Apr 2022" },
    { value: 295, date: "22 Apr 2022" },
    { value: 260, date: "23 Apr 2022" },
    { value: 255, date: "24 Apr 2022" },

    { value: 190, date: "25 Apr 2022" },
    { value: 220, date: "26 Apr 2022" },
    { value: 205, date: "27 Apr 2022" },
    { value: 230, date: "28 Apr 2022" },
    { value: 210, date: "29 Apr 2022" },
    {
      value: 200,
      date: "30 Apr 2022",
      label: "30 Apr",
      labelTextStyle: { color: "lightgray", width: 60 },
    },
    { value: 240, date: "1 May 2022" },
    { value: 250, date: "2 May 2022" },
    { value: 280, date: "3 May 2022" },
    { value: 250, date: "4 May 2022" },
    { value: 210, date: "5 May 2022" },
  ];
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
          <TouchableOpacity>
            <View
              style={{
                backgroundColor: "gray",
                paddingVertical: 5,
                paddingHorizontal: 10,
                borderRadius: 5,
              }}
            >
              <Text style={{ color: "white" }}>Hourly</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View
              style={{
                backgroundColor: "gray",
                paddingVertical: 5,
                paddingHorizontal: 10,
                borderRadius: 5,
              }}
            >
              <Text style={{ color: "white" }}>Daily</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View
              style={{
                backgroundColor: "gray",
                paddingVertical: 5,
                paddingHorizontal: 10,
                borderRadius: 5,
              }}
            >
              <Text style={{ color: "white" }}>Monthly</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View
              style={{
                backgroundColor: "green",
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
            data={ptData}
            rotateLabel
            width={screenWidth - 40}
            height={280}
            spacing={10}
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
            hideRules
            noOfSections={4}
            maxValue={400}
            data={ptData}
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
