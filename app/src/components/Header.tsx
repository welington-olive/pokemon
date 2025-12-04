import React from 'react';
import { View } from 'react-native';
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
      {rightAction && <View className="mr-2">{rightAction}</View>}
    </Appbar.Header>
  );
};

