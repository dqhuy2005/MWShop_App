/**
 * Global Styles
 * Reusable style definitions
 */

import { StyleSheet } from 'react-native';
import { COLORS } from '../constants/colors';
import theme from './theme';

export const globalStyles = StyleSheet.create({
  // Layout
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  
  // Padding
  p0: { padding: 0 },
  p1: { padding: theme.spacing.xs },
  p2: { padding: theme.spacing.sm },
  p3: { padding: theme.spacing.md },
  p4: { padding: theme.spacing.lg },
  p5: { padding: theme.spacing.xl },
  
  // Margin
  m0: { margin: 0 },
  m1: { margin: theme.spacing.xs },
  m2: { margin: theme.spacing.sm },
  m3: { margin: theme.spacing.md },
  m4: { margin: theme.spacing.lg },
  m5: { margin: theme.spacing.xl },
  
  // Margin vertical
  mv1: { marginVertical: theme.spacing.xs },
  mv2: { marginVertical: theme.spacing.sm },
  mv3: { marginVertical: theme.spacing.md },
  mv4: { marginVertical: theme.spacing.lg },
  
  // Margin horizontal
  mh1: { marginHorizontal: theme.spacing.xs },
  mh2: { marginHorizontal: theme.spacing.sm },
  mh3: { marginHorizontal: theme.spacing.md },
  mh4: { marginHorizontal: theme.spacing.lg },
  
  // Text
  textCenter: {
    textAlign: 'center',
  },
  
  textBold: {
    fontWeight: theme.typography.fontWeights.bold,
  },
  
  textPrimary: {
    color: COLORS.primary,
  },
  
  textSecondary: {
    color: COLORS.textSecondary,
  },
  
  textError: {
    color: COLORS.error,
  },
  
  // Shadows
  shadow: theme.shadows.md,
  shadowSm: theme.shadows.sm,
  shadowLg: theme.shadows.lg,
});

export default globalStyles;
