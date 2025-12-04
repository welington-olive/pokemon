import React from 'react';
import { View } from 'react-native';
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
        contentContainerStyle={{
          backgroundColor: colors.background,
          padding: 20,
          margin: 20,
          borderRadius: 8,
        }}
      >
        {title && (
          <View className="mb-4">
            <Text style={{ fontSize: 20, fontWeight: '600', color: colors.text.primary }}>
              {title}
            </Text>
          </View>
        )}
        {children}
      </PaperModal>
    </Portal>
  );
};

