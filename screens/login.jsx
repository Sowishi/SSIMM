import { Linking, Text, TextInput, View } from "react-native";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { FAB } from "@rneui/themed";
import LottieView from "lottie-react-native";
import { SpeedDial } from "@rneui/themed";
import { useContext, useState } from "react";
import CustomTextInput from "../components/customTextInput";
import useGetUsers from "../hooks/useGetUsers";
import { AuthContext } from "../context/authContext";
import Toast from "react-native-toast-message";
import { useFonts } from "expo-font";
import Loading from "../components/loading";

const Login = ({ navigation }) => {
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  const { users } = useGetUsers();
  const { setUser } = useContext(AuthContext);
  const [loaded, error] = useFonts({
    Kanit: require("../assets/Kanit-Regular.ttf"),
  });

  if (!loaded) {
    return <Loading />;
  }

  const handleLogin = () => {
    let userFound = false;
    users.map((user) => {
      console.log(user);
      if (
        user.username.trim() == username?.trim() &&
        user.password.trim() == password?.trim()
      ) {
        setUser(user);
        console.log(user);
        userFound = true;
        navigation.navigate("home");
      }
    });
    if (!userFound) {
      Toast.show({
        type: "error",
        text1: "Invalid username or password",
      });
    }
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#FAFAFA",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View style={{ flex: 1 }}>
        <LottieView
          autoPlay
          style={{ minWidth: 300, minHeight: 300 }}
          source={require("../assets/welcome.json")}
        ></LottieView>
      </View>

      <View
        style={{
          flex: 1.5,
          width: "90%",
        }}
      >
        <Text
          style={{
            fontSize: 30,
            fontWeight: "bold",
            letterSpacing: 10,
            fontFamily: "Kanit",
          }}
        >
          Login
        </Text>
        <View
          style={{
            flex: 3,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CustomTextInput
            title={"Username"}
            icon={"user"}
            handleChange={(text) => setUsername(text)}
          />
          <CustomTextInput
            secured
            title={"Password"}
            icon={"lock"}
            handleChange={(text) => setPassword(text)}
          />

          <FAB
            color="#0D0E10"
            onPress={handleLogin}
            visible={true}
            title="Login"
            upperCase
            icon={{ name: "login", color: "white" }}
          />
        </View>
        <View
          style={{ flex: 1, justifyContent: "flex-end", alignItems: "center" }}
        >
          <Text style={{ marginBottom: 5, fontFamily: "Kanit" }}>
            Jpang National High School @2024
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Login;
