import { isLoading } from "expo-font";
import React from "react";
import {
  TouchableOpacity,
  Text,
  TouchableOpacityProps,
  ActivityIndicator,
} from "react-native";
import { theme } from "../../theme";
import { styles } from "./styles";

interface props extends TouchableOpacityProps {
  isLoading: boolean;
}

export function Button({ isLoading, ...rest }: props) {
  return (
    <TouchableOpacity style={styles.container} {...rest}>
      {isLoading ? (
        <ActivityIndicator color={theme.colors.text_on_brand_color} />
      ) : (
        <Text style={styles.buttonText}>Enviar</Text>
      )}
    </TouchableOpacity>
  );
}
