import React, { useRef, useState } from 'react';
import { TouchableOpacity } from 'react-native';

import BottomSheet from '@gorhom/bottom-sheet';

import { Form } from '../Form';
import { Options } from '../Options';
import { Success } from '../Success';

import { ChatTeardropDots } from 'phosphor-react-native';

import { feedbackTypes } from '../../utils/feedbackTypes';

import { theme } from '../../theme';

import { styles } from './styles';

export type FeedbackType = keyof typeof feedbackTypes;

export function Widget() {
  const bottomSheetRef = useRef<BottomSheet>(null);

  const [feedbackType, setFeedbackType] = useState<FeedbackType | null>(null);
  const [feedbackSent, setFeedbackSent] = useState(false);

  function handleOpen() {
    bottomSheetRef.current?.expand();
  }

  function handleRestartFeedback() {
    setFeedbackType(null);
    setFeedbackSent(false);
  }

  function handleSentFeedback() {
    setFeedbackSent(true);
  }

  return (
    <>
        <TouchableOpacity
          style={styles.button}
          onPress={handleOpen}
        >
          <ChatTeardropDots
            size={24}
            color={theme.colors.text_on_brand_color}
            weight="bold"
          />
        </TouchableOpacity>

        <BottomSheet
          ref={bottomSheetRef}
          snapPoints={[1, 270]}
          backgroundStyle={styles.modal}
          handleIndicatorStyle={styles.indicator}
        >
          {
            feedbackSent
            ? <Success onSentNewFeedback={handleRestartFeedback} />
            : (
              <>
                {feedbackType
                  ? <Form
                      feedbackType={feedbackType}
                      onFeedbackCanceled={handleRestartFeedback}
                      onFeedbackSent={handleSentFeedback}
                    />
                  : <Options onFeedbackTypeChanged={setFeedbackType} />
                }
              </>
            )
          }
        </BottomSheet>
    </>
  );
}
