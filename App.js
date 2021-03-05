import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Login from './screens/Login';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Register from './screens/Register';
import Home from './screens/Home';
import { Platform, InteractionManager } from 'react-native';
import StartupDetails from './screens/StartupDetails';
import Startup from './screens/Startup';
import Invest from './screens/Invest';
import StartupComponent from './screens/StartupComponent';
import { auth } from 'firebase';
import CHATS from './screens/CHATS';
import SelectContact from './screens/SelectContact';
import AddFreelance from './screens/AddFreelance';
import freelancer from './screens/freelancer';
const _setTimeout = global.setTimeout;
const _clearTimeout = global.clearTimeout;
const MAX_TIMER_DURATION_MS = 60 * 1000;
if (Platform.OS === 'android') {
  const timerFix = {};
  const runTask = (id, fn, ttl, args) => {
    const waitingTime = ttl - Date.now();
    if (waitingTime <= 1) {
      InteractionManager.runAfterInteractions(() => {
        if (!timerFix[id]) {
          return;
        }
        delete timerFix[id];
        fn(...args);
      });
      return;
    }
    const afterTime = Math.min(waitingTime, MAX_TIMER_DURATION_MS);
    timerFix[id] = _setTimeout(() => runTask(id, fn, ttl, args), afterTime);
  };
  global.setTimeout = (fn, time, ...args) => {
    if (MAX_TIMER_DURATION_MS < time) {
      const ttl = Date.now() + time;
      const id = '_lt_' + Object.keys(timerFix).length;
      runTask(id, fn, ttl, args);
      return id;
    }
    return _setTimeout(fn, time, ...args);
  };
  global.clearTimeout = id => {
    if (typeof id === 'string' && id.startsWith('_lt_')) {
      _clearTimeout(timerFix[id]);
      delete timerFix[id];
      return;
    }
    _clearTimeout(id);
  };
}

const Stack = createStackNavigator();
const globalScreenOption={
  headerStyle:{backgroundColor:"#2C6BED"},
  headerTitleStyle:{color:"white"},
  headerTintColor:"white",
  gestureEnabled:true,
  headerShown:true,
  gesturesEnabled: true,
  


}
export default function App() {
  
  return (
    <NavigationContainer >
     <Stack.Navigator  screenOptions={globalScreenOption}>
      <Stack.Screen name="Login"  component={Login} />
      <Stack.Screen name="Register"  component={Register} />
      <Stack.Screen name="Home" options={{headerShown:false}} component={Home} />
      <Stack.Screen name="StartupDetails" component={StartupDetails} />
      <Stack.Screen name="Startup"  component={Startup}/>
      <Stack.Screen name="Invest" component={Invest}/>
      <Stack.Screen  name="StartupComponent" component={StartupComponent}/>
      <Stack.Screen name="toChat" component={CHATS} />
      <Stack.Screen name="SelectContac" component={SelectContact} />
      <Stack.Screen name="AddFreelance" component={AddFreelance} />
      <Stack.Screen name="Freelance" component={freelancer} />
      </Stack.Navigator>


    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
