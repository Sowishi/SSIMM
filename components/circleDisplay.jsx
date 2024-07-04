import LottieView from "lottie-react-native";
import { Text } from "react-native";
import { AnimatedCircularProgress } from "react-native-circular-progress";

const CircleDisplay = () => {
  return (
    <AnimatedCircularProgress
      size={220}
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
              fontSize: 20,
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
  );
};

export default CircleDisplay;
