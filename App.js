import axios from 'axios';
import React, {useState} from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';
import { View ,Text, FlatList, Platform, PermissionsAndroid, StyleSheet } from "react-native"
import Geolocation from 'react-native-geolocation-service';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import RenderCard from './src/components/Card';
import Footer from './src/components/Footer';
import SearchBar from "./src/components/SearchBar"
import SkeltonLoading from './src/components/SkeltonLoading';
import { PATHS, STRINGS } from './src/utils/strings';
import {API_KEY} from '@env';

const App = props => {

  const [data, setData] = useState([]);
  const [nextPgToken, setNextPgToken] = useState(null)
  const [loadMore, setLoadMore] = useState(false)
  const [refreshing, setRefreshing] = useState(false)
  const [value, setValue] = useState('')
  const [loading, setLoading] = useState(false)

  let latitude = useRef();
  let longitude = useRef();

  useEffect(()=>{
   setLoading(true)
   requestPermission();
  },[])

  useEffect(()=>{
    if(refreshing) requestPermission();
  },[refreshing])

  useEffect(()=>{
    (async () => await requestPermission())()
  },[value])

  const requestPermission = async () => {
    if (Platform.OS == 'ios') {
      Geolocation.requestAuthorization();
      getCurrentLocation();
    } else {
     const granted = await PermissionsAndroid.request(
       PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
     );
      console.log(granted)
      if (granted === PermissionsAndroid.RESULTS.GRANTED) getCurrentLocation();
      else {
        setLoading(false)
        alert(STRINGS.denied);}
    }
  };

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        latitude.current = position.coords.latitude;
        longitude.current = position.coords.longitude;
        apiCall();
      },
      (error) => {
        console.log(error.code, error.message);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  };

  const apiCall = async() => {
    try{
      let params = {
        location: latitude.current + ',' + longitude.current,
        radius: 2500,
        key: API_KEY,
        type: STRINGS.restaurant,
      };
      if(nextPgToken) params.pagetoken = nextPgToken;
      if(value) params.keyword = value;
      const result = await axios.get(PATHS.nearBy,{params})
      console.log(result);
      if(result.data?.results?.length) setData([...data, ...result.data?.results])
      setNextPgToken(result.data?.next_page_token);
      setLoadMore(false);
      setRefreshing(false);
      setLoading(false)
    }catch(err){
      console.log(err)
    }
  }

  const onPressFooter = () => {
    setLoadMore(true);
    apiCall();
  }

  const onRefresh = () => {
   setNextPgToken(null);
   setData([])
   setRefreshing(true);
  }

  const onChange = (val) => {
    setNextPgToken(null);
    setData([])
    setLoading(true);
    setValue(val);
  }

  return (
    <View style={styles.container}>
      <SearchBar value={value} onChange={onChange} />
      {loading || refreshing ? (
        <SkeltonLoading />
      ) : (
        <FlatList
          data={data}
          initialNumToRender={20}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index}) => <RenderCard item={item} />}
          ListFooterComponent={
            nextPgToken && <Footer onPress={onPressFooter} loading={loadMore} />
          }
          contentContainerStyle={{flexGrow: 1}}
          refreshing={refreshing}
          onRefresh={onRefresh}
          ListEmptyComponent={<Text style={styles.empty}>{STRINGS.noMore}</Text>}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: wp('1%'),
    paddingTop: hp('2%'),
    backgroundColor: 'white',
  },
  empty: {
    textAlignVertical: 'center',
    alignSelf: 'center',
    textAlign: 'center',
    color: 'grey',
    fontFamily: 'Montserrat-SemiBold',
    flex: 1,
  },
});

export default App;