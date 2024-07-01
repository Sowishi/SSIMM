import {
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Constants from "expo-constants";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { ListItem, SpeedDial } from "react-native-elements";
import { Button } from "@rneui/themed";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { TextInput } from "react-native";

const Admin = () => {
  const data = [
    { id: "1", title: "Item 1" },
    { id: "2", title: "Item 2" },
    { id: "3", title: "Item 3" },
    { id: "4", title: "Item 4" },
    { id: "5", title: "Item 5" },
  ];

  const [modalVisible, setModalVisible] = useState(false);
  const [open, setOpen] = useState(false);

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

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={{ flex: 1, justifyContent: "flex-end" }}>
          <View style={{ height: 450, backgroundColor: "white" }}>
            <Text style={{ fontSize: 25, fontWeight: "bold", margin: 20 }}>
              Add User
            </Text>
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
                <FontAwesome5 name="phone" size={15} color="#4157BC" />
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
                placeholder="Phone Number"
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
            <Button
              buttonStyle={{ margin: 20 }}
              ViewComponent={LinearGradient} // Don't forget this!
              linearGradientProps={{
                colors: ["#5A9AE6", "#7FDC67"],
                start: { x: 0, y: 0.5 },
                end: { x: 1, y: 0.5 },
              }}
            >
              Add User
            </Button>
          </View>
        </View>
      </Modal>

      <SpeedDial
        style={{ zIndex: 9999 }}
        isOpen={open}
        icon={{ name: "person", color: "#fff" }}
        openIcon={{ name: "close", color: "#fff" }}
        onOpen={() => setOpen(!open)}
        onClose={() => setOpen(!open)}
      >
        <SpeedDial.Action
          icon={{ name: "person", color: "#fff" }}
          title="Add User"
          onPress={() => setModalVisible(true)}
        />
        <SpeedDial.Action
          icon={{ name: "logout", color: "#fff" }}
          title="Log out"
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

export default Admin;
