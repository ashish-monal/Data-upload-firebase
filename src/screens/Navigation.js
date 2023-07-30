import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import WelcomeScreen from './WelcomeScreen';
import LoginScreen from './LoginScreen';
import SignupScreen from './SignupScreen';
import Home from './Dashboard/Home';
import Splash from './Splash';
import RnCamera from './Dashboard/RnCamera';
import FetchData from './Dashboard/FetchData';
import PostData from './Dashboard/PostData';
import UploadImage from './Dashboard/UploadImage';
import EmailVerificatiom from './Dashboard/EmailVerificatiom';

const stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <stack.Navigator initialRouteName="Splash">
        <stack.Screen name="Welcome" component={WelcomeScreen} />
        <stack.Screen name="Login" component={LoginScreen} />
        <stack.Screen name="Signup" component={SignupScreen} />
        <stack.Screen name="Home" component={Home} />
        <stack.Screen
          name="Splash"
          component={Splash}
          options={{headerShown: false}}
        />
        <stack.Screen name="Camera" component={RnCamera} />
        <stack.Screen name="FetchData" component={FetchData} />
        <stack.Screen name="PostData" component={PostData} />
        <stack.Screen name="UploadImage" component={UploadImage} />
        <stack.Screen name="EmailVerification" component={EmailVerificatiom} />
      </stack.Navigator>
    </NavigationContainer>
  );
};
export default Navigation;
