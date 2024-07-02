import {
  ActivityIndicator,
  FlatList,
  Image,
  Modal,
  Text,
  View,
} from "react-native";
import Constants from "expo-constants";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { ListItem, SpeedDial } from "react-native-elements";
import { Button } from "@rneui/themed";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useState } from "react";
import CustomTextInput from "../components/customTextInput";
import Toast from "react-native-toast-message";
import useAddUser from "../hooks/useAddUser";
import useGetUsers from "../hooks/useGetUsers";

const Admin = () => {
  const data = [
    { id: "1", title: "Item 1" },
    { id: "2", title: "Item 2" },
    { id: "3", title: "Item 3" },
    { id: "4", title: "Item 4" },
    { id: "5", title: "Item 5" },
  ];

  //Hooks
  const { addUser, error, loading } = useAddUser();
  const { users, loading: getUserLoading } = useGetUsers();

  //State

  const [modalVisible, setModalVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const [userData, setUserData] = useState({
    username: "",
    phone: "",
    password: "",
  });

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
      <Image
        source={{ uri: item.profilePic }}
        style={{ width: 40, height: 40 }}
      />
      <ListItem.Content>
        <ListItem.Title>{item.username}</ListItem.Title>
      </ListItem.Content>
      <ListItem.Chevron />
    </ListItem.Swipeable>
  );

  const handleUserDataChange = (name, text) => {
    const newUserData = { ...userData, [name]: text };
    setUserData(newUserData);
  };

  useEffect(() => {
    if (error) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: error,
      });
    }
  }, [error]);

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
        <FlatList data={users} renderItem={renderItem} />
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

            <CustomTextInput
              title={"Username"}
              icon="user"
              handleChange={(text) => handleUserDataChange("username", text)}
            />
            <CustomTextInput
              title={"Phone"}
              icon={"phone"}
              handleChange={(text) => handleUserDataChange("phone", text)}
            />
            <CustomTextInput
              icon={"lock"}
              title={"Password"}
              handleChange={(text) => handleUserDataChange("password", text)}
            />

            <Button
              onPress={() => {
                addUser(userData);
                setModalVisible(false);
                Toast.show({
                  type: "success",
                  text1: "Success",
                  text2: "Successfull Added User",
                });
                setUserData({ username: "", password: "", phone: "" });
              }}
              buttonStyle={{ margin: 20 }}
              ViewComponent={LinearGradient} // Don't forget this!
              linearGradientProps={{
                colors: ["#5A9AE6", "#7FDC67"],
                start: { x: 0, y: 0.5 },
                end: { x: 1, y: 0.5 },
              }}
            >
              {loading ? <ActivityIndicator /> : "Add User"}
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
