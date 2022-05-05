import { StyleSheet } from 'react-native';
import { theme } from '../../theme';

export const styles = StyleSheet.create({
  container: {
    alignItems: 'center',

    paddingHorizontal: 24,
  },

  header: {
    flexDirection: 'row',

    marginVertical: 16,
  },
  titleContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',

    paddingRight: 24,
  },
  titleText: {
    fontSize: 20,
    fontFamily: theme.fonts.medium,
    color: theme.colors.text_primary,
  },
  image: {
    width: 24,
    height: 24,

    marginRight: 8,
  },

  input: {
    width: '100%',
    height: 112,

    padding: 12,
    marginBottom: 8,

    borderWidth: 1,
    borderColor: theme.colors.stroke,
    borderRadius: 4,

    fontFamily: theme.fonts.regular,
    color: theme.colors.text_primary,
  },

  footer: {
    flexDirection: 'row',

    marginBottom: 16,
  },
});
