import {
  ActivityIndicator,
  FlatList,
  Image,
  Modal,
  Text,
  TouchableOpacity,
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
import useUpdateUser from "../hooks/useUpdateUser";
import useDeleteUser from "../hooks/useDeleteUser";

const Admin = () => {
  //Hooks
  const { addUser, error, loading } = useAddUser();
  const { users, loading: getUserLoading } = useGetUsers();
  const { updateUser } = useUpdateUser();
  const { deleteUser } = useDeleteUser();

  //State

  const [addUserModal, setAddUserModal] = useState(false);
  const [viewUserModal, setViewUserModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userData, setUserData] = useState({
    username: "",
    phone: "",
    password: "",
  });

  const renderItem = ({ item }) => (
    <ListItem
      onPress={() => {
        setViewUserModal(true);
        setSelectedUser(item);
      }}
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
    >
      <Image
        source={{ uri: item.profilePic }}
        style={{ width: 40, height: 40 }}
      />
      <ListItem.Content>
        <ListItem.Title>{item.username}</ListItem.Title>
      </ListItem.Content>
      <ListItem.Chevron />
    </ListItem>
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
      <View style={{ margin: 10 }}>
        <FlatList data={users} renderItem={renderItem} />
      </View>
      {/* //Add User Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={addUserModal}
        onRequestClose={() => {
          setAddUserModal(!addUserModal);
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
                setAddUserModal(false);
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
      {/* //View User Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={viewUserModal}
        onRequestClose={() => {
          setViewUserModal(!viewUserModal);
        }}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#21212199",
          }}
        >
          <View
            style={{
              height: 550,
              width: "100%",
              backgroundColor: "white",
              padding: 20,
            }}
          >
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <View style={{ position: "relative" }}>
                <TouchableOpacity
                  onPress={() => setDeleteModal(true)}
                  style={{ position: "absolute", right: -5, zIndex: 2 }}
                >
                  <FontAwesome5 name="trash" color="red" size={25} />
                </TouchableOpacity>
                <Image
                  source={{ uri: selectedUser?.profilePic }}
                  style={{ width: 100, height: 100 }}
                />
              </View>

              <Text style={{ fontSize: 30, fontWeight: "bold" }}>
                {selectedUser?.username}
              </Text>
            </View>
            <CustomTextInput
              handleChange={(text) => handleUserDataChange("username", text)}
              title={selectedUser?.username}
              icon={"user"}
            />
            <CustomTextInput
              handleChange={(text) => handleUserDataChange("phone", text)}
              title={selectedUser?.phone}
              icon={"phone"}
            />
            <CustomTextInput
              handleChange={(text) => handleUserDataChange("password", text)}
              title={selectedUser?.password}
              icon={"lock"}
            />
            <Button
              onPress={() => {
                updateUser(userData, selectedUser?.id);
                setViewUserModal(false);
              }}
              buttonStyle={{ margin: 20 }}
              ViewComponent={LinearGradient} // Don't forget this!
              linearGradientProps={{
                colors: ["#5A9AE6", "#7FDC67"],
                start: { x: 0, y: 0.5 },
                end: { x: 1, y: 0.5 },
              }}
            >
              Update User
            </Button>
          </View>
        </View>
      </Modal>
      <Modal
        animationType="fade"
        transparent={true}
        visible={deleteModal}
        onRequestClose={() => {
          setDeleteModal(!deleteModal);
        }}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#21212199",
          }}
        >
          <View
            style={{
              height: 200,
              width: "100%",
              backgroundColor: "white",
              padding: 20,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{ fontSize: 20, fontWeight: "bold", textAlign: "center" }}
            >
              Are you sure you want to delete, {selectedUser?.username}?
            </Text>
            <View style={{ flexDirection: "row" }}>
              <Button
                onPress={() => setDeleteModal(false)}
                buttonStyle={{ margin: 20 }}
                ViewComponent={LinearGradient} // Don't forget this!
                linearGradientProps={{
                  colors: ["#5A9AE6", "#7FDC67"],
                  start: { x: 0, y: 0.5 },
                  end: { x: 1, y: 0.5 },
                }}
              >
                Cancel
              </Button>
              <Button
                onPress={() => {
                  deleteUser(selectedUser?.id);
                  setDeleteModal(false);
                  setViewUserModal(false);
                }}
                buttonStyle={{ margin: 20 }}
                ViewComponent={LinearGradient} // Don't forget this!
                linearGradientProps={{
                  colors: ["red", "orange"],
                  start: { x: 0, y: 0.5 },
                  end: { x: 1, y: 0.5 },
                }}
              >
                Delete User
              </Button>
            </View>
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
          onPress={() => setAddUserModal(true)}
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
