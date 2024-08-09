import { FontAwesome5 } from "@expo/vector-icons";
import { Text, View } from "react-native";

const TransactionCard = ({ item }) => {
  const date = new Date(item.createdAt);
  const formattedDateTime = date.toLocaleString();

  console.log(item);
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
          <FontAwesome5
            name="lightbulb"
            size={25}
            color={item.type == "add" ? "green" : "red"}
          />
          <View style={{ marginLeft: 10 }}>
            <Text
              style={{
                fontSize: 20,
                fontFamily: "Kanit",
                fontWeight: "bold",
              }}
            >
              {item.type == "add" ? "Added" : "Remove"}
            </Text>
            <Text
              style={{
                fontSize: 15,
                fontFamily: "Kanit",
                color: "gray",
              }}
            >
              {formattedDateTime}
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
            {item.type == "add" ? "+" : "-"}
            {item.balance}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default TransactionCard;
