import React from 'react';
import { View } from 'react-native';
import LogoIcon from '../../assets/logo.svg';

export const Logo: React.FC = () => {
  return (
    <View className="items-center mb-8">
      <LogoIcon width={200} height={100} />
    </View>
  );
};

