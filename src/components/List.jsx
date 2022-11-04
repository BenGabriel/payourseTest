import {Animated, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useCallback, useRef, useState} from 'react';

const List = ({index, coin, value, eachList, scrollY}) => {
  const [coinKey, setCoinKey] = useState('');
  const rateAnimation = useRef(new Animated.Value(0)).current;

  // initial list animation
  const translateList = val => {
    return eachList.interpolate({
      inputRange: [0, 1],
      outputRange: [val * 100, 0],
    });
  };

  // reduce scale of list on scroll
  const scale = scrollY.interpolate({
    inputRange: [-1, 0, index * 90, (index + 1) * 90],
    outputRange: [1, 1, 1, 0.9],
  });

  //animate rate
  const animateRate = value => {
    Animated.timing(rateAnimation, {
      toValue: value,
      duration: 400,
      useNativeDriver: true,
    }).start();
  };

  //Translate rate from top to botom
  const translateRate = rateAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [-11, 0],
  });

  // handle click of each coin
  const handleCoinClick = useCallback(() => {
    if (coinKey === value.key) {
      rateAnimation.setValue(0);
      setCoinKey('');
    } else {
      animateRate(1);
      setCoinKey(value.key);
    }
  }, [coinKey]);

  return (
    <Animated.View
      style={[
        styles.listContainer,
        {
          transform: [
            {
              translateX: translateList(index + 1),
            },
            {
              scale,
            },
          ],
        },
      ]}>
      <View style={styles.sideColor} />
      <TouchableOpacity
        style={{paddingLeft: 10, flex: 1}}
        onPress={handleCoinClick} 
        testID="coin">
        <Text style={{fontSize: 17, color: 'black'}}>{coin}</Text>
        {value.key === coinKey ? (
          <Animated.Text
            style={{
              marginTop: 5,
              fontSize: 13,
              color: 'black',
              transform: [
                {
                  translateY: translateRate,
                },
              ],
            }} testID="rate">
            Rate: {value.rate}
          </Animated.Text>
        ) : null}
      </TouchableOpacity>
    </Animated.View>
  );
};

export default List;

const styles = StyleSheet.create({
  listContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '95%',
    backgroundColor: '#fff',
    elevation: 2,
    borderRadius: 10,
    alignSelf: 'center',
    height: 70,
    marginVertical: 10,
  },
  sideColor: {
    height: '100%',
    width: 5,
    backgroundColor: '#202A44',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
});
