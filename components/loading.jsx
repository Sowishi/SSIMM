import LottieView from "lottie-react-native";
import { View } from "react-native";

const Loading = () => {
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
};

export default Loading;
