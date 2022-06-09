import BottomSheet from "@gorhom/bottom-sheet";
import { ChatTeardropDots } from "phosphor-react-native";
import React, { useRef, useState } from "react";
import {
  InputAccessoryView,
  Keyboard,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { theme } from "../../theme";
import { feedbackTypes } from "../../utils/feedbackTypes";
import { Form } from "../Form";
import { Options } from "../Options";
import { Success } from "../Sucess";
import { styles } from "./styles";

export type IFeedbackTypes = keyof typeof feedbackTypes;

export function Widget() {
  const [feedbackType, setFeedbackType] = useState<IFeedbackTypes | null>(null);
  const [feedbackSent, setFeedbackSent] = useState(false);

  const bottomSheetRef = useRef<BottomSheet>(null);

  function handleOpen() {
    bottomSheetRef.current?.expand();
  }

  function handleFeedbackSelection(key: IFeedbackTypes) {
    setFeedbackType(key);
  }

  function resetFeedbackType() {
    setFeedbackType(null);
    setFeedbackSent(false);
  }

  return (
    <>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          handleOpen();
          Keyboard.dismiss();
        }}
      >
        <ChatTeardropDots
          size={24}
          color={theme.colors.text_on_brand_color}
          weight="bold"
        />
      </TouchableOpacity>
      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={[1, 280]}
        backgroundStyle={styles.modal}
        handleIndicatorStyle={styles.indicator}
      >
        {feedbackSent ? (
          <Success onResetFeedback={resetFeedbackType} />
        ) : (
          <>
            {feedbackType ? (
              <Form
                feedbackType={feedbackType}
                resetFeedbackType={resetFeedbackType}
                onFeedbackSent={setFeedbackSent}
              />
            ) : (
              <Options onFeedbackTypeSelect={handleFeedbackSelection} />
            )}
          </>
        )}
      </BottomSheet>
    </>
  );
}
