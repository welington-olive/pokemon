import React from 'react';
import { View, StyleSheet } from 'react-native';
import LogoIcon from '../../assets/logo.svg';

export const Logo: React.FC = () => {
  return (
    <View style={styles.container}>
      <LogoIcon width={200} height={100} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: 32,
  },
});

