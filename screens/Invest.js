import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import InvestFeed from './InvestFeed';
import YourInvestments from './YourInvestments';
const Invest = () => {
    const Tab = createMaterialTopTabNavigator();
    const globalScreenOption={
        activeTintColor:"white",
        inactiveTintColor:"black",
        style :{ backgroundColor: '#2C6BED' },
        pressColor :"powerblue"

        
      
      
      }
    return (
        <Tab.Navigator tabBarOptions={globalScreenOption}>
        <Tab.Screen name="Feed" component={InvestFeed} />
        <Tab.Screen name="Your Investments" component={YourInvestments} />
      </Tab.Navigator>
    )
}

export default Invest

const styles = StyleSheet.create({})
