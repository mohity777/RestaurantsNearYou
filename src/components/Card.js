import React from 'react';
import Shadow from './ShadowBox';
import {Rating} from 'react-native-ratings';
import FastImage from 'react-native-fast-image';
import {StyleSheet, Text, View} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { PATHS, STRINGS } from '../utils/strings';
import {API_KEY} from '@env';

const RenderCard = ({item}) => {
  return (
    <Shadow style={styles.card}>
      {item?.photos ? (
        <FastImage
          source={{
            uri: `${PATHS.placePhoto}?maxwidth=${item?.photos[0]?.width}&photoreference=${item?.photos[0]?.photo_reference}&key=${API_KEY}`,
          }}
          style={styles.img}
          resizeMode={FastImage.resizeMode.stretch}
        />
      ) : (
        <View style={styles.noView}>
          <Text style={styles.noTxt}>{STRINGS.noPhoto}</Text>
        </View>
      )}
      <View style={styles.right}>
        <View style={styles.top}>
          <Text numberOfLines={2} style={styles.name}>
            {item?.name}
          </Text>
        </View>
        <View style={styles.bottom}>
          <View style={styles.rating}>
            <Rating
              ratingCount={5}
              type="star"
              readonly={true}
              startingValue={item?.rating || 0}
              imageSize={wp('3%')}
            />
            <Text style={styles.ratingTxt}>
              {item?.rating} ({item?.user_ratings_total || 0} {STRINGS.rating})
            </Text>
          </View>
          <Text style={styles.status}>
            {STRINGS.status}: <Text style={styles.black}>{item?.business_status}</Text>
          </Text>
          <Text style={styles.status}>
            {STRINGS.near}: <Text style={styles.black}>{item?.vicinity}</Text>
          </Text>
        </View>
      </View>
    </Shadow>
  );
};

const styles = StyleSheet.create({
  card: {flexDirection: 'row', alignItems: 'center', height: hp('18%')},
  img: {height: '100%', width: '30%', borderRadius: wp('1.5%')},
  noView: {
    height: '100%',
    width: '30%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(200,200,200)',
  },
  noTxt: {
    fontFamily: 'Montserrat-SemiBold',
    color: 'grey',
    textAlign: 'center',
  },
  right: {flex: 1, paddingLeft: wp('2%')},
  top: {
    paddingBottom: 2,
    borderBottomWidth: 1,
    borderColor: '#E5E5E5',
  },
  name: {fontFamily: 'Montserrat-SemiBold', fontSize: wp('3.5%')},
  bottom: {flex: 1, alignItems: 'flex-start'},
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: hp('0.4%'),
  },
  ratingTxt: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: wp('3%'),
    marginLeft: wp('2%'),
    color: 'rgb(33,186,69)',
  },
  status: {
    fontFamily: 'Montserrat-Medium',
    fontSize: wp('2.8%'),
    color: 'grey',
  },
  black: {color: 'black'},
});

export default RenderCard
