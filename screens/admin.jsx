import {
  ActivityIndicator,
  FlatList,
  Image,
  Modal,
  ScrollView,
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
import AnimatedNumbers from "react-native-animated-numbers";
import { BarCodeScanner } from "expo-barcode-scanner";

const Admin = ({ navigation }) => {
  //Hooks
  const { addUser, error, loading } = useAddUser();
  const { users, loading: getUserLoading } = useGetUsers();
  const { updateUser } = useUpdateUser();
  const { deleteUser } = useDeleteUser();
  const [loaded] = useFonts({
    Kanit: require("../assets/Kanit-Regular.ttf"),
  });

  //Loading State

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
  const [scannerModal, setScannerModal] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userData, setUserData] = useState({
    username: "",
    phone: "",
    password: "",
    balance: "",
  });

  const [addBalance, setAddBalance] = useState(0);
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  const handleUpdateUserData = (item) => {
    setUserData({
      username: item.username,
      phone: item.phone,
      password: item.password,
      balance: item.balance,
    });
  };

  const handleUserDataChange = (name, text) => {
    const newUserData = { ...userData, [name]: text };
    setUserData(newUserData);
  };

  const handleBarCodeScanned = ({ type, data }) => {
    users.map((user) => {
      if (user.id == data) {
        setSelectedUser(user);
      }
    });

    setViewUserModal(true);
    setScanned(false);
    setScannerModal(false);
  };

  useEffect(() => {
    if (error) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: error,
      });
    }

    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getBarCodeScannerPermissions();
  }, [error]);

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

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

      <ScrollView style={{ margin: 10 }}>
        <FlatList
          data={users}
          renderItem={({ item }) => (
            <UserCard
              item={item}
              setViewUserModal={setViewUserModal}
              setSelectedUser={setSelectedUser}
              handleUpdateUserData={handleUpdateUserData}
            />
          )}
        />
      </ScrollView>
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
        <View>
          <Text style={{ fontFamily: "Kanit", fontSize: 20, marginLeft: 20 }}>
            Initial Balance
          </Text>
          <CustomTextInput
            handleChange={(text) => handleUserDataChange("balance", text)}
            title={"Please input the initial balance"}
            icon={"bolt"}
            type="numeric"
          />
        </View>

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
          buttonStyle={{ margin: 20, borderRadius: 10, paddingVertical: 13 }}
          ViewComponent={LinearGradient} // Don't forget this!
          linearGradientProps={{
            colors: ["#5A9AE6", "#7FDC67"],
            start: { x: 0, y: 0.5 },
            end: { x: 1, y: 0.5 },
          }}
        >
          {loading ? <ActivityIndicator /> : "Add User"}
          <FontAwesome5
            style={{ marginLeft: 5 }}
            name={"user-plus"}
            size={15}
            color="white"
          />
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

          <Text style={{ fontSize: 20, fontWeight: "bold", marginTop: 5 }}>
            {selectedUser?.username}
          </Text>
          <Text style={{ fontSize: 15, color: "gray", marginTop: 5 }}>
            Current Balance:
          </Text>
          <AnimatedNumbers
            includeComma
            animateToNumber={selectedUser ? selectedUser.balance : 0}
            fontStyle={{
              fontSize: 30,
              fontWeight: "bold",
              fontFamily: "Kanit",
            }}
          />
        </View>
        <CustomTextInput
          handleChange={(text) => handleUserDataChange("username", text)}
          title={selectedUser?.username}
          value={userData.username}
          icon={"user"}
        />
        <CustomTextInput
          handleChange={(text) => handleUserDataChange("phone", text)}
          title={selectedUser?.phone}
          icon={"phone"}
          value={userData.phone}
        />
        <CustomTextInput
          handleChange={(text) => handleUserDataChange("password", text)}
          title={selectedUser?.password}
          icon={"lock"}
          value={userData.password}
        />
        <View>
          <Text style={{ fontFamily: "Kanit", fontSize: 20, marginLeft: 20 }}>
            Add Balance
          </Text>
          <CustomTextInput
            handleChange={(text) => setAddBalance(text)}
            title={"Input the balance that you will add"}
            icon={"bolt"}
            type="numeric"
          />
        </View>

        <Button
          onPress={() => {
            updateUser(userData, selectedUser, addBalance);
            setViewUserModal(false);
            setAddBalance(0);
          }}
          buttonStyle={{ margin: 20, borderRadius: 10, paddingVertical: 13 }}
          ViewComponent={LinearGradient} // Don't forget this!
          linearGradientProps={{
            colors: ["#5A9AE6", "#7FDC67"],
            start: { x: 0, y: 0.5 },
            end: { x: 1, y: 0.5 },
          }}
        >
          Update User{" "}
          <FontAwesome5
            style={{ marginLeft: 5 }}
            name={"edit"}
            size={15}
            color="white"
          />
        </Button>
      </CustomModal>

      {/* Delete Modal     */}
      <CustomModal
        open={deleteModal}
        handleClose={() => setDeleteModal(false)}
        modalAnimation={"fade"}
      >
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            padding: 20,
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
              buttonStyle={{
                margin: 20,
                paddingVertical: 13,
                width: 130,
                borderRadius: 10,
              }}
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
              buttonStyle={{
                margin: 20,
                paddingVertical: 13,
                width: 130,
                borderRadius: 10,
              }}
              ViewComponent={LinearGradient} // Don't forget this!
              linearGradientProps={{
                colors: ["red", "orange"],
                start: { x: 0, y: 0.5 },
                end: { x: 1, y: 0.5 },
              }}
            >
              Delete
            </Button>
          </View>
        </View>
      </CustomModal>

      {/* Scanner Modal */}
      <CustomModal
        modalAnimation={"fade"}
        height={500}
        open={scannerModal}
        handleClose={() => setScannerModal(false)}
      >
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <BarCodeScanner
            style={{ height: 400, width: 500 }}
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          />
          <Button
            onClick={() => setScannerModal(false)}
            style={{ width: 300, marginHorizontal: 10, marginTop: 20 }}
            buttonStyle={{
              paddingVertical: 15,
              borderRadius: 10,
            }}
            ViewComponent={LinearGradient} // Don't forget this!
            linearGradientProps={{
              colors: ["#5A9AE6", "red"],
              start: { x: 0, y: 0.5 },
              end: { x: 1, y: 0.5 },
            }}
          >
            <Text style={{ color: "white" }}>Close Modal</Text>
          </Button>
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
          icon={{ name: "qr-code", color: "#fff" }}
          title="Scan QR Code"
          onPress={() => setScannerModal(true)}
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
