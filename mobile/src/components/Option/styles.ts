import { StyleSheet } from 'react-native';

import { theme } from '../../theme';

export const styles = StyleSheet.create({
  container: {
    width: 104,
    height: 112,

    justifyContent: 'center',
    alignItems: 'center',

    padding: 8,
    marginHorizontal: 8,

    backgroundColor: theme.colors.surface_secondary,
    borderRadius: 8,
  },
  image: {
    width: 40,
    height: 40,
  },
  title: {
    fontSize: 14,
    fontFamily: theme.fonts.medium,
    color: theme.colors.text_primary,

    marginTop: 8,
  },
});
