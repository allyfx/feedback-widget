import React from 'react';
import { View, Image, TouchableOpacity, Text } from 'react-native';

import { Copyright } from '../Copyright';

import successImg from '../../assets/success.png';

import { styles } from './styles';

interface Props {
  onSentNewFeedback: () => void;
}

export function Success({ onSentNewFeedback }: Props) {
  return (
    <View style={styles.container}>
      <Image source={successImg} style={styles.image} />

      <Text style={styles.title}>
        Agradecemos o feedback
      </Text>

      <TouchableOpacity style={styles.button} onPress={onSentNewFeedback}>
        <Text style={styles.buttonTitle}>
          Quero enviar outro
        </Text>
      </TouchableOpacity>

      <Copyright />
    </View>
  );
}
