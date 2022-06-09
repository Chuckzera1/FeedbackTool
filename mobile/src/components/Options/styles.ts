import { StyleSheet } from "react-native";
import { theme } from "../../theme";

export const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  options: {
    width: "100%",
    marginBottom: 48,
    flexDirection: "row",
    justifyContent: "center",
  },
  text: {
    fontSize: 20,
    fontFamily: theme.fonts.medium,
    color: theme.colors.text_primary,
    marginBottom: 32,
  },
});
