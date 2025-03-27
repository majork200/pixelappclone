import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const MyImageButton = (props) => {
  const { btnColor, title, titleColor, customClick, btnIcon } = props;

  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: btnColor }]}
      onPress={customClick}
    >
      <Icon style={styles.icon} name={btnIcon} size={30} color="white" />
      <Text style={[styles.text, { color: titleColor }]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    padding: 10,
    marginTop: 16,
    marginLeft: 35,
    marginRight: 35,
    borderRadius: 5,
  },
  icon: {
    paddingBottom: 5,
  },
});

export default MyImageButton;
