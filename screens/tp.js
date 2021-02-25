import React from 'react'

import { StyleSheet, Text, View, Button } from 'react-native';
import Animated from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';

const tp = () => {

    const sheetRef = React.useRef(null);
    const renderContent = () => (
        <View
          style={{
            backgroundColor: 'white',
            padding: 16,
            height: 450,
          }}
        >
          <Text>Swipe down to close</Text>
        </View>
      );

      return (
        <>
          
        </>
      );
}

export default tp

const styles = StyleSheet.create({})
