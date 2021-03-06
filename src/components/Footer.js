import React from 'react';
import {ActivityIndicator, View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { STRINGS } from '../utils/strings';

const Footer = (props) => {
  if (props.loading)
    return (
      <ActivityIndicator
        size={wp('5%')}
        color="black"
        style={styles.load}
      />
    );

  return (
    <View style={styles.view}>
      <TouchableOpacity hitSlop={styles.hitSlop} onPress={props.onPress}>
        <Text style={styles.text}>{STRINGS.loadMore}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    width: '100%',
    paddingVertical: hp('0.5%'),
    alignItems: 'center',
  },
  load: {alignSelf: 'center'},
  text: {fontFamily:"Montserrat-SemiBold", fontSize:wp('3.3%')},
  hitSlop:{top:20,left:50,right:50,bottom:50}
});

export default Footer;
