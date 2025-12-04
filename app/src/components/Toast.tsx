import React from 'react';
import { Snackbar } from 'react-native-paper';
import { colors } from '../theme/colors';

interface ToastProps {
  visible: boolean;
  message: string;
  onDismiss: () => void;
  type?: 'success' | 'error' | 'info';
}

export const Toast: React.FC<ToastProps> = ({
  visible,
  message,
  onDismiss,
  type = 'info',
}) => {
  const getBackgroundColor = () => {
    switch (type) {
      case 'success':
        return colors.success;
      case 'error':
        return colors.error;
      default:
        return colors.text.secondary;
    }
  };

  return (
    <Snackbar
      visible={visible}
      onDismiss={onDismiss}
      duration={3000}
      style={{ backgroundColor: getBackgroundColor() }}
    >
      {message}
    </Snackbar>
  );
};

