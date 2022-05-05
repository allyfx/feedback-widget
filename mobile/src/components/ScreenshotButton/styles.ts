import { StyleSheet } from 'react-native';

import { theme } from '../../theme';

export const styles = StyleSheet.create({
  container: {
    position: 'relative',
    
    width: 40,
    height: 40,

    backgroundColor: theme.colors.surface_secondary,
    borderRadius: 4,

    justifyContent: 'center',
    alignItems: 'center',

    marginRight: 8,
  },
  removeIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
  },

  image: {
    width: 40,
    height: 40,
  },
});
