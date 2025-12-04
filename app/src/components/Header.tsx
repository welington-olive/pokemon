import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Appbar } from 'react-native-paper';
import { colors } from '../theme/colors';

interface HeaderProps {
  title: string;
  onBack?: () => void;
  rightAction?: React.ReactNode;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  onBack,
  rightAction,
}) => {
  return (
    <Appbar.Header style={{ backgroundColor: colors.primary }}>
      {onBack && <Appbar.BackAction onPress={onBack} color={colors.background} />}
      <Appbar.Content title={title} titleStyle={{ color: colors.background }} />
      {rightAction && <View style={styles.rightAction}>{rightAction}</View>}
    </Appbar.Header>
  );
};

const styles = StyleSheet.create({
  rightAction: {
    marginRight: 8,
  },
});

