import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#D4D93D",
  },
  image: {
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    color: "white",
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "#96A61C",
    backgroundColor: "white",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingLeft: 10,
  },
  button: {
    width: "100%",
    height: 40,
    backgroundColor: "#5F7317",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
  },
});
