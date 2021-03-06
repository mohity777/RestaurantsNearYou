import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const SkeltonLoading = (props) => {
  return (
    <ScrollView>
      <SkeletonPlaceholder>
        {[1, 2, 3, 4, 5].map((item, index) => (
          <View
            key={index}
            style={styles.view}
          />
        ))}
      </SkeletonPlaceholder>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  view: {
    margin: wp('2%'),
    borderRadius: wp('2%'),
    height: hp('18%'),
  },
});

export default SkeltonLoading;
