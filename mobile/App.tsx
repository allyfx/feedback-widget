import 'react-native-gesture-handler';

import { View, ActivityIndicator } from 'react-native';

import { StatusBar } from 'expo-status-bar';
import { useFonts, Inter_400Regular, Inter_500Medium } from '@expo-google-fonts/inter';

import { theme } from './src/theme';
import { Widget } from './src/components/Widget';

export default function App() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
  });

  if (!fontsLoaded) {
    return <ActivityIndicator />;
  }

  return (
    <View style={{
      flex: 1,
      backgroundColor: theme.colors.background,
    }}>
      <Widget />

      <StatusBar
        style="light"
        backgroundColor='transparent'
        translucent
      />
    </View>
  );
}
