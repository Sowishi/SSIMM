import { Modal, View } from "react-native";

const CustomModal = ({
  children,
  height,
  open,
  handleClose,
  modalAnimation,
}) => {
  return (
    <Modal
      animationType={modalAnimation}
      transparent={true}
      visible={open}
      onRequestClose={handleClose}
    >
      <View
        style={{
          flex: 1,
          justifyContent: "flex-end",
          backgroundColor: "#12121299",
        }}
      >
        <View
          style={{
            height: height,
            backgroundColor: "white",
            paddingVertical: 30,
          }}
        >
          {children}
        </View>
      </View>
    </Modal>
  );
};

export default CustomModal;
