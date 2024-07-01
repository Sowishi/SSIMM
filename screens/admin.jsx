import { FlatList, Text, View } from "react-native";
import Constants from "expo-constants";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { ListItem } from "react-native-elements";
import { Button } from "@rneui/themed";
import { LinearGradient } from "expo-linear-gradient";

const Admin = () => {
  const data = [
    { id: "1", title: "Item 1" },
    { id: "2", title: "Item 2" },
    { id: "3", title: "Item 3" },
    { id: "4", title: "Item 4" },
    { id: "5", title: "Item 5" },
  ];

  const renderItem = ({ item }) => (
    <ListItem.Swipeable
      style={{
        borderBottomWidth: 0.5,
        borderBottomColor: "gray",
        backgroundColor: "white",
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,

        elevation: 2,
      }}
      rightContent={
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Button
            buttonStyle={{ minHeight: "100%", backgroundColor: "red" }}
            ViewComponent={LinearGradient} // Don't forget this!
            linearGradientProps={{
              colors: ["#F44336", "#FF9800"],
            }}
          >
            Delete User
          </Button>
        </View>
      }
    >
      <FontAwesome5 name="user" size={27} />
      <ListItem.Content>
        <ListItem.Title>{item.title}</ListItem.Title>
      </ListItem.Content>
      <ListItem.Chevron />
    </ListItem.Swipeable>
  );

  return (
    <View
      style={{
        flex: 1,
        marginTop: Constants.statusBarHeight,
        backgroundColor: "#FBFFF5",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "start",
        }}
      >
        <Text style={{ fontSize: 25, margin: 20, fontWeight: "bold" }}>
          Users Management
        </Text>
        <FontAwesome5 name="user" size={27} />
      </View>
      <View>
        <FlatList data={data} renderItem={renderItem} />
      </View>
    </View>
  );
};

export default Admin;
