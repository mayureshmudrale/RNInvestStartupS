import React, { Component } from 'react'
import { Text, StyleSheet, View,Dimensions } from 'react-native'
import { TapGestureHandler } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';

const {width,height} =Dimensions.get('window')


const Bottomsheet = ({translateY,gestureHandler}) => {
    return (
        <>
        <TapGestureHandler {...gestureHandler}>

        <Animated.View style={{...StyleSheet.absoluteFill,backgroundColor:'rgba(0,0,0,0.5)',zIndex:-1}}>
        </Animated.View>
        </TapGestureHandler>
       

        
        <Animated.View style={{...styles.Bottomsheet,transform:[{translateY}]}}>

        </Animated.View>
        </>
    )
}

export default Bottomsheet


const styles = StyleSheet.create({
    Bottomsheet:{
        position:"absolute",
        bottom:0,
        width:width-20,
        height:300,
        backgroundColor:"white",
        borderRadius:25,
        marginHorizontal:10,
        alignItems:"center"

    }
})

