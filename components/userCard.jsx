import { Image, Text } from "react-native";
import { ListItem } from "react-native-elements";

const UserCard = ({
  item,
  setViewUserModal,
  setSelectedUser,
  handleUpdateUserData,
}) => {
  return (
    <ListItem
      onPress={() => {
        setViewUserModal(true);
        setSelectedUser(item);
        handleUpdateUserData(item);
      }}
      style={{
        backgroundColor: "white",
        margin: 5,
        borderRadius: 20,
        padding: 5,
        shadowColor: "#000",
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
        <ListItem.Title style={{ fontFamily: "Kanit" }}>
          {item.username}
        </ListItem.Title>
        <Text style={{ fontFamily: "Kanit" }}>
          Role: {item.role ? item.role : "customer"}
        </Text>
      </ListItem.Content>
      <ListItem.Chevron />
    </ListItem>
  );
};

export default UserCard;
