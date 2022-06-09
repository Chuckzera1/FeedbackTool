import { ArrowLeft, TwitterLogo } from "phosphor-react-native";
import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  InputAccessoryView,
} from "react-native";
import * as FileSystem from "expo-file-system";
import { ScrollView } from "react-native-gesture-handler";
import { captureScreen } from "react-native-view-shot";
import { api } from "../../libs/axios";
import { theme } from "../../theme";
import { feedbackTypes } from "../../utils/feedbackTypes";
import { Button } from "../Button";
import { ScreenshotButton } from "../ScreenshotButton";
import { IFeedbackTypes } from "../Widget";
import { styles } from "./styles";

interface Props {
  feedbackType: IFeedbackTypes;
  resetFeedbackType: () => void;
  onFeedbackSent: (isSent: boolean) => void;
}

export function Form({
  feedbackType,
  resetFeedbackType,
  onFeedbackSent,
}: Props) {
  const [comment, setComment] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [screenshot, setScreenshot] = useState<string | null>(null);

  const feedbackTypeInfo = feedbackTypes[feedbackType];

  function handleScreenShot() {
    captureScreen({
      format: "jpg",
      quality: 0.8,
    })
      .then((uri) => setScreenshot(uri))
      .catch((e) => console.log(e));
  }

  function handleRemoveScreenshot() {
    setScreenshot(null);
  }

  async function handleFeedbackSent() {
    if (isLoading) return;

    setIsLoading(true);
    const screenshotBae64 =
      screenshot &&
      (await FileSystem.readAsStringAsync(screenshot, { encoding: "base64" }));
    console.log(screenshotBae64);
    try {
      await api.post("/feedbacks", {
        type: feedbackType,
        comment,
        screenshot: `data:image/png;base64, ${screenshotBae64}`,
      });
      setIsLoading(false);
      onFeedbackSent(true);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      onFeedbackSent(false);
    }
  }

  return (
    <InputAccessoryView>
      <ScrollView keyboardDismissMode="interactive">
        <View style={styles.container} nativeID="view-id" key="main-container">
          <View style={styles.header}>
            <TouchableOpacity onPress={() => resetFeedbackType()}>
              <ArrowLeft
                size={24}
                weight="bold"
                color={theme.colors.text_secondary}
              />
            </TouchableOpacity>
            <View style={styles.titleContainer}>
              <Image source={feedbackTypeInfo.image} style={styles.image} />
              <Text style={styles.titleText}>{feedbackTypeInfo.title}</Text>
            </View>
          </View>

          <TextInput
            multiline
            style={styles.input}
            placeholder="Alguma coisa não está funcionando bem? Nos conte com detalhes..."
            placeholderTextColor={theme.colors.text_secondary}
            inputAccessoryViewID="nativeId"
            onChangeText={setComment}
          />
          <View style={styles.footer}>
            <ScreenshotButton
              onTakeShot={handleScreenShot}
              onRemoveShot={handleRemoveScreenshot}
              screenshot={screenshot}
            />
            <Button isLoading={isLoading} onPress={handleFeedbackSent} />
          </View>
        </View>
      </ScrollView>
    </InputAccessoryView>
  );
}
