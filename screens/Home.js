import React from 'react'
import { SafeAreaView } from 'react-native'
import { StyleSheet, Text, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import Invest from './Invest';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Startup from './Startup';
import Chat from './Chat';
import Icon from 'react-native-vector-icons/FontAwesome';
import freelancer from './freelancer';
import { Avatar } from 'react-native-elements';
import Profile from './Profile';
import { auth } from '../firebase';
import tp from './tp';


const Home = () => {
    const Tab = createBottomTabNavigator();
    const user=auth.currentUser;
    
    return (
      <Tab.Navigator 
      initialRouteName="Invest"
      activeColor="black"
      inactiveColor="black"
      barStyle={{ backgroundColor: 'white' }}
      shifting={true}
      sceneAnimationEnabled={false}
      tabBarOptions ={{keyboardHidesTabBar:true}}
      
      
      >
       <Tab.Screen name="Invest"
        component={Invest}
        options={{
            tabBarLabel: 'Invest',
            tabBarIcon: () => (
              <Icon name="line-chart"  size={26} />
            ),
          }}
        />
       <Tab.Screen name="Startup" component={Startup} 
               options={{
                tabBarLabel: 'Startup',
                tabBarIcon: () => (
                  <Icon name="flash"  size={26} />
                ),
              }}
       
       />
       <Tab.Screen name="Chat" component={Chat} 
               options={{
                tabBarLabel: 'Chat',
                tabBarIcon: () => (
                  <Icon name="wechat"  size={26} />
                ),
              }}
       />
        <Tab.Screen name="Profile" component={Profile} 
               options={{
                tabBarLabel: 'Profile',
                tabBarIcon: () => (
                  <Avatar
                  rounded
                  source={{
                  uri:auth.currentUser.photoURL,
                   
                    }}
                  />
                ),
              }}
       />


        </Tab.Navigator>
        
        
    )
}

export default Home

const styles = StyleSheet.create({})
