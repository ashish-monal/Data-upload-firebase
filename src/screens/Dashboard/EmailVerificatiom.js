import React, {useState} from 'react';
import {View, TextInput, Button, Alert} from 'react-native';
import auth from '@react-native-firebase/auth';

const EmailVerificationScreen = () => {
  const [email, setEmail] = useState('');

  const handleSendEmailVerification = async () => {
    if (email.trim() === '') {
      Alert.alert('Error', 'Please enter an email address.');
      return;
    }

    try {
      await auth().sendPasswordResetEmail(email);
      Alert.alert(
        'Email Verification Sent',
        'An email verification link has been sent to the provided email address.',
      );
    } catch (error) {
      Alert.alert(
        'Error',
        'Failed to send email verification. Please try again later.',
      );
      console.error('Error sending email verification:', error);
    }
  };

  return (
    <View>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={text => setEmail(text)}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <Button
        title="Send Verification Email"
        onPress={handleSendEmailVerification}
      />
    </View>
  );
};

export default EmailVerificationScreen;
