import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Portal, Modal as PaperModal, Text } from 'react-native-paper';
import { colors } from '../theme/colors';

interface ModalProps {
  visible: boolean;
  onDismiss: () => void;
  children: React.ReactNode;
  title?: string;
}

export const Modal: React.FC<ModalProps> = ({
  visible,
  onDismiss,
  children,
  title,
}) => {
  return (
    <Portal>
      <PaperModal
        visible={visible}
        onDismiss={onDismiss}
        contentContainerStyle={styles.container}
      >
        {title && (
          <View style={styles.header}>
            <Text style={styles.title}>{title}</Text>
          </View>
        )}
        {children}
      </PaperModal>
    </Portal>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    padding: 20,
    margin: 20,
    borderRadius: 8,
  },
  header: {
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text.primary,
  },
});

