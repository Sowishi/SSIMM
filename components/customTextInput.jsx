import { FontAwesome5 } from "@expo/vector-icons";
import { TextInput, View } from "react-native";

const CustomTextInput = ({ handleChange, title, icon, value, secured }) => {
  return (
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
        <FontAwesome5 name={icon} size={15} color="#4157BC" />
      </View>
      <TextInput
        value={value}
        secureTextEntry={secured}
        onChangeText={handleChange}
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
        placeholder={title}
      ></TextInput>
    </View>
  );
};

export default CustomTextInput;
