import React from "react";
import { View, Text } from "react-native";
import { Copyright } from "../Copyright";

import { feedbackTypes } from "../../utils/feedbackTypes";
import { styles } from "./styles";
import { Option } from "../Option";
import { IFeedbackTypes } from "../Widget";

interface Props {
  onFeedbackTypeSelect: (key: IFeedbackTypes) => void;
}

export function Options({ onFeedbackTypeSelect }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Deixe seu Feedback</Text>
      <View style={styles.options}>
        {Object.entries(feedbackTypes).map(([key, value]) => (
          <Option
            key={key}
            title={value.title}
            image={value.image}
            onPress={() => onFeedbackTypeSelect(key as IFeedbackTypes)}
          />
        ))}
      </View>
      <Copyright />
    </View>
  );
}
