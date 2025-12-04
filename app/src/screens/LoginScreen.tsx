import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuthContext } from '../contexts/AuthContext';
import { loginSchema, LoginFormData } from '../schemas/auth';
import { Logo, TextInput, PasswordInput, Button, Footer, Toast } from '../components';
import { colors } from '../theme/colors';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';

type LoginScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;

export const LoginScreen: React.FC = () => {
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const { login } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'error' | 'info'>('info');

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      setLoading(true);
      await login(data.email, data.password);
    } catch (error: any) {
      setToastMessage(error.message);
      setToastType('error');
      setToastVisible(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      className="bg-background p-6"
      keyboardShouldPersistTaps="handled"
    >
      <View className="flex-1 justify-center">
        <Logo />
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, value } }) => (
            <TextInput
              label="Email"
              value={value || ''}
              onChangeText={onChange}
              error={errors.email?.message}
              keyboardType="email-address"
              autoComplete="email"
            />
          )}
        />
        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, value } }) => (
            <PasswordInput
              label="Password"
              value={value || ''}
              onChangeText={onChange}
              error={errors.password?.message}
            />
          )}
        />
        <Button
          label="Login"
          onPress={handleSubmit(onSubmit)}
          loading={loading}
        />
        <Footer
          text="Don't have an account?"
          linkText="Register"
          onLinkPress={() => navigation.navigate('Register')}
        />
      </View>
      <Toast
        visible={toastVisible}
        message={toastMessage}
        onDismiss={() => setToastVisible(false)}
        type={toastType}
      />
    </ScrollView>
  );
};

