import { useCallback } from 'react';
import { View, StyleSheet, Text, Pressable } from 'react-native';

import LoginForm from '../components/forms/LoginForm';
import { useSignIn } from '../shared/hooks/auth/useSignIn';
import commonStyles from '../styles';

const LoginScreen = () => {
  const { mutate, loading, error } = useSignIn();

  const onSubmit = useCallback(async (email: string, password: string) => {
    try {
      await mutate(email?.trim() ?? email, password);
    } catch (e) {
      // already handled by custom hook
    }
  }, []);

  return (
    <View style={styles.container}>
      <LoginForm onSubmit={onSubmit} isLoading={loading} error={error?.message} />
      <View style={styles.signUpFooter}>
        <Text style={styles.signUpText}>Don't have an account?</Text>
        <Pressable>
          <Text style={[styles.signUpText, styles.signUpLink]}>Sign up</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...commonStyles.containers.screen,
    backgroundColor: commonStyles.colors.blue,
    padding: 25,
    alignItems: 'center',
  },
  signUpFooter: {
    marginTop: 25,
    flexDirection: 'row',
  },
  signUpText: {
    color: commonStyles.colors.white,
    padding: 5,
    fontSize: 14,
  },
  signUpLink: {
    color: commonStyles.colors.purpleDark,
    fontFamily: 'SemiBold',
  },
});

export default LoginScreen;
