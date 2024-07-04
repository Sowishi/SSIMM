import { FontAwesome5 } from "@expo/vector-icons";
import { Text, View } from "react-native";

const TransactionCard = () => {
  return (
    <View style={{ marginTop: 10 }}>
      <View
        style={{
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: "row",
          padding: 15,
          backgroundColor: "white",
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,

          elevation: 5,
          borderRadius: 20,
          marginVertical: 10,
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <FontAwesome5 name="lightbulb" size={25} color={"green"} />
          <View style={{ marginLeft: 10 }}>
            <Text
              style={{
                fontSize: 20,
                fontFamily: "Kanit",
                fontWeight: "bold",
              }}
            >
              Received
            </Text>
            <Text
              style={{
                fontSize: 15,
                fontFamily: "Kanit",
                color: "gray",
              }}
            >
              July 4, 2024
            </Text>
          </View>
        </View>
        <View>
          <Text
            style={{
              fontSize: 20,
              fontFamily: "Kanit",
            }}
          >
            +20 watts
          </Text>
        </View>
      </View>
    </View>
  );
};

export default TransactionCard;