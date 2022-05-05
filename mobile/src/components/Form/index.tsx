import React, { useState } from 'react';
import {
  View,
  TextInput,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native';

import { captureScreen } from 'react-native-view-shot';
import FileSystem from 'expo-file-system';

import { ArrowLeft } from 'phosphor-react-native';

import { ScreenshotButton } from '../ScreenshotButton';
import { Button } from '../Button';
import { FeedbackType } from '../Widget';
import { feedbackTypes } from '../../utils/feedbackTypes';

import { theme } from '../../theme';

import { api } from '../../libs/api';

import { styles } from './styles';

interface Props {
  feedbackType: FeedbackType;
  onFeedbackCanceled: () => void;
  onFeedbackSent: () => void;
}

export function Form({ feedbackType, onFeedbackCanceled, onFeedbackSent }: Props) {
  const [screenshot, setScreenshot] = useState<string | null>(null);
  const [comment, setComment] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const feedbackInfo = feedbackTypes[feedbackType];

  async function handleScreenshot() {
    try {
      const uri = await captureScreen({
        format: 'jpg',
        quality: 0.8,
      });
  
      setScreenshot(uri);
    } catch(err) {
      console.log(err);
    }
  }

  function handleRemoveScreenshot() {
    setScreenshot(null);
  }

  async function handleSubmitFeedback() {
    try {
      setIsLoading(true);

      const screenshotBase64 = screenshot && await FileSystem.readAsStringAsync(screenshot, { encoding: 'base64' });

      await api.post('/feedbacks', {
        type: feedbackType,
        comment,
        screenshot: `data:image/png;base64, ${screenshotBase64}`,
      });
    } catch(err) {

    } finally {
      setIsLoading(false);
      
      onFeedbackSent();
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onFeedbackCanceled}>
          <ArrowLeft
            size={24}
            weight="bold"
            color={theme.colors.text_secondary}
          />
        </TouchableOpacity>

        <View style={styles.titleContainer}>
          <Image
            source={feedbackInfo.image}
            style={styles.image}
          />

          <Text style={styles.titleText}>
            {feedbackInfo.title}
          </Text>
        </View>
      </View>
      
      <TextInput
        multiline
        style={styles.input}
        placeholder="Conte com detalhes o que está acontecendo..."
        placeholderTextColor={theme.colors.text_secondary}
        autoCorrect={false}
        onChangeText={setComment}
      />

      <View style={styles.footer}>
        <ScreenshotButton
          onTakeShot={handleScreenshot}
          onRemoveShot={handleRemoveScreenshot}
          screenshot={screenshot}
        />

        <Button
          isLoading={isLoading}
          onPress={handleSubmitFeedback}
        />
      </View>
    </View>
  );
}
