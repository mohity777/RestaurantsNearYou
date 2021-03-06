import React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

export default function Shadow({children, ...props}) {
  return (
    <TouchableOpacity
      disabled={!props.onPress || props.disabled}
      onPress={props.onPress}
      needsOffscreenAlphaCompositing={true}
      style={[style.shadow, props.style]}
      onStartShouldSetResponder={props.onStartShouldSetResponder}
      activeOpacity={props.activeOpacity}>
      {children}
    </TouchableOpacity>
  );
}

const style = StyleSheet.create({
  shadow: {
    margin: wp('2%'),
    borderRadius: wp('2%'),
    backgroundColor: 'white',
    padding: wp('2.5%'),
    elevation: 5,
    borderWidth: 0.5,
    borderColor: 'rgb(200,200,200)',
  },
});
