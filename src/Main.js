import {Animated, StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useEffect, useMemo, useRef, useState} from 'react';
import List from './components/List';

const Main = () => {
  const scrollY = useRef(new Animated.Value(0)).current;
  const eachList = useRef(new Animated.Value(0)).current;
  const [allCoins, setAllCoins] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  //   get coin function
  const getCoin = async () => {
    try {
      const data = await fetch(
        'https://staging-biz.coinprofile.co/v3/currency/rate',
      );

      let res = await data.json();
      eachList.setValue(0);
      setAllCoins(Object.entries(res.data.rates));
    } catch (error) {}
  };

  useEffect(() => {
    getCoin();
  }, []);

  //animate each list
  const animateEachList = () => {
    Animated.timing(eachList, {
      toValue: 1,
      duration: 700,
      useNativeDriver: true,
    }).start();
  };

  useMemo(() => {
    animateEachList();
  }, [allCoins]);

  const searchArray = useMemo(() => {
    return allCoins.filter(([key]) => key.includes(searchValue.toUpperCase()));
  }, [searchValue]);

  return (
    <View
      style={{flex: 1, padding: 20, paddingTop: 40, backgroundColor: 'white'}} testID="main-screen">
      <Text style={styles.headerText}>Coin</Text>

      {/* Search */}
      <View style={styles.search}>
        <TextInput
          placeholder="Search for coin"
          style={{
            color:'black'
          }}
          placeholderTextColor="black"
          value={searchValue}
          onChangeText={setSearchValue}
        />
      </View>

      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {contentOffset: {y: scrollY}},
            },
          ],
          {useNativeDriver: true},
        )}>
        {allCoins.length < 1 ? (
          <Text style={{alignSelf: 'center'}}>Loading Coins</Text>
        ) : searchArray.length === 0 ? (
          allCoins.map(([key, value], index) => (
            <List
              index={index}
              key={key}
              coin={key}
              value={value}
              scrollY={scrollY}
              eachList={eachList}
            />
          ))
        ) : (
          searchArray.map(([key, value], index) => (
            <List
              index={index}
              key={key}
              coin={key}
              value={value}
              scrollY={scrollY}
              eachList={eachList}
            />
          ))
        )}
      </Animated.ScrollView>
    </View>
  );
};

export default Main;

const styles = StyleSheet.create({
  headerText: {
    fontSize: 25,
    fontWeight: '700',
    color:"black"
  },
  search: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    borderRadius: 50,
    backgroundColor: '#f1f1f1',
    width: '97%',
    alignSelf: 'center',
    marginVertical: 15,
    height: 46,
  },
});
