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
import { useFonts } from "expo-font";
import UserCard from "../components/userCard";
import CustomModal from "../components/customModal";

const Admin = ({ navigation }) => {
  //Hooks
  const { addUser, error, loading } = useAddUser();
  const { users, loading: getUserLoading } = useGetUsers();
  const { updateUser } = useUpdateUser();
  const { deleteUser } = useDeleteUser();
  const [loaded] = useFonts({
    Kanit: require("../assets/Kanit-Regular.ttf"),
  });

  if (!loaded) {
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
  }

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
        <Text
          style={{
            fontSize: 25,
            margin: 20,
            fontFamily: "Kanit",
          }}
        >
          Users Management
        </Text>
        <FontAwesome5 name="user" size={20} />
      </View>
      <View style={{ margin: 10 }}>
        <FlatList
          data={users}
          renderItem={({ item }) => (
            <UserCard
              item={item}
              setViewUserModal={setViewUserModal}
              setSelectedUser={setSelectedUser}
            />
          )}
        />
      </View>
      {/* //Add User Modal */}
      <CustomModal
        open={addUserModal}
        handleClose={() => setAddUserModal(false)}
        modalAnimation={"slide"}
      >
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
      </CustomModal>

      {/* //View User Modal */}
      <CustomModal
        open={viewUserModal}
        modalAnimation={"fade"}
        handleClose={() => setViewUserModal(false)}
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
      </CustomModal>

      {/* Delete Modal     */}
      <CustomModal
        open={deleteModal}
        handleClose={() => setDeleteModal(false)}
        modalAnimation={"fade"}
      >
        <View style={{ justifyContent: "center", alignItems: "center" }}>
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
      </CustomModal>

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
          onPress={() => navigation.navigate("login")}
        />
      </SpeedDial>
    </View>
  );
};

export default Admin;
