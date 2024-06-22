import { Linking, Text, TextInput, View } from "react-native";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { FAB } from "@rneui/themed";
import LottieView from "lottie-react-native";
import { SpeedDial } from "@rneui/themed";
import { useState } from "react";

const Login = () => {
  const [open, setOpen] = useState(false);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#FBFFF5",
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
        <Text style={{ fontSize: 30, fontWeight: "bold", letterSpacing: 10 }}>
          Login
        </Text>
        <View
          style={{
            flex: 3,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              margin: 20,
              position: "relative",
            }}
          >
            <View
              style={{
                backgroundColor: "white",
                borderRadius: 100,
                width: 50,
                height: 50,
                justifyContent: "center",
                alignItems: "center",
                padding: 10,
                left: 0,
                top: 0,
                zIndex: 2,
                position: "absolute",
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
              <FontAwesome5 name="user" size={15} color="#4157BC" />
            </View>
            <TextInput
              style={{
                flex: 1,
                paddingVertical: 10,
                backgroundColor: "white",
                borderRadius: 20,
                paddingLeft: 30,
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,

                elevation: 5,
                marginLeft: 30,
              }}
              placeholder="Username"
            ></TextInput>
          </View>
          <View
            style={{
              flexDirection: "row",
              margin: 20,
              position: "relative",
            }}
          >
            <View
              style={{
                backgroundColor: "white",
                borderRadius: 100,
                width: 50,
                height: 50,
                justifyContent: "center",
                alignItems: "center",
                padding: 10,
                left: 0,
                top: 0,
                zIndex: 2,
                position: "absolute",
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
              <FontAwesome5 name="lock" size={15} color="#4157BC" />
            </View>
            <TextInput
              style={{
                flex: 1,
                paddingVertical: 10,
                backgroundColor: "white",
                borderRadius: 20,
                paddingLeft: 30,
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,

                elevation: 5,
                marginLeft: 30,
              }}
              placeholder="Password"
            ></TextInput>
          </View>
          <FAB
            visible={true}
            title="Login"
            upperCase
            icon={{ name: "login", color: "white" }}
          />
        </View>
        <View
          style={{ flex: 1, justifyContent: "flex-end", alignItems: "center" }}
        >
          <Text style={{ marginBottom: 5 }}>Electricity @2024</Text>
        </View>
      </View>
      <SpeedDial
        isOpen={open}
        icon={{ name: "question-mark", color: "#fff" }}
        openIcon={{ name: "close", color: "#fff" }}
        onOpen={() => setOpen(!open)}
        onClose={() => setOpen(!open)}
      >
        <SpeedDial.Action
          icon={{ name: "phone", color: "#fff" }}
          title="Contact Us"
          onPress={() =>
            Linking.openURL(
              "https://www.facebook.com/profile.php?id=100073436105134"
            )
          }
        />
      </SpeedDial>
    </View>
  );
};

export default Login;
