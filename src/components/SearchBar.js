import React from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Ionicons';

const SearchBar = (props) => {
  return (
    <View style={styles.view}>
      <Icon name="search" style={styles.icon} />
      <TextInput
        onChangeText={props.onChange}
        value={props.value}
        style={styles.input}
        placeholder="Search By Keyword"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    flex: 1,
    padding: 0,
    height: '100%',
    paddingHorizontal: wp('1.5%'),
    fontFamily: 'Montserrat-Medium',
  },
  view: {
    height: hp('5.5%'),
    borderWidth: 0.5,
    borderColor: 'rgb(200,200,200)',
    width: '94%',
    alignSelf: 'center',
    backgroundColor: 'rgb(250,250,250)',
    borderRadius: wp('2%'),
    marginBottom: hp('0.8%'),
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp('2%'),
  },
  icon: {color: 'grey', fontSize: wp('6%')},
});

export default SearchBar;
