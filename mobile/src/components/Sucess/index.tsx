import React from "react";
import { Image, Text, View } from "react-native";

import { styles } from "./styles";
import successImage from "../../assets/success.png";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Copyright } from "../Copyright";

interface Props {
  onResetFeedback: () => void;
}

export function Success({ onResetFeedback }: Props) {
  return (
    <View style={styles.container}>
      <Image source={successImage} style={styles.image} />
      <Text style={styles.title}>Agradecemos o Feedback</Text>
      <TouchableOpacity style={styles.button} onPress={onResetFeedback}>
        <Text style={styles.buttonTitle}>Enviar outro feedback</Text>
      </TouchableOpacity>
      <Copyright />
    </View>
  );
}
