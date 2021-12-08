import {useNavigation} from '@react-navigation/core';
import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import ItemListFood from '../ItemListFood';
import {Button} from '../../atoms';
import {getFoodData} from '../../../redux/action';
import {getData} from '../../../utils';

const CustomTab = () => {
  const [foodMenu, setFoodMenu] = useState('all');
  const [all, setAll] = useState('red');
  const [foodItem, setFoodItem] = useState('#909090');
  const [baveragesItem, setBaveragesItem] = useState('#909090');

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [token, setToken] = useState('');
  const {allFood, food, baverages} = useSelector(state => state.menuReducer);
  const [postPerLoad] = useState(10);

  useEffect(() => {
    getData('token').then(res => {
      setToken(res.value);
      dispatch(getFoodData(res.value));
    });

    if (foodMenu === 'all') {
      setAll('red');
      setFoodItem('#909090');
      setBaveragesItem('#909090');
    } else if (foodMenu === 'food') {
      setAll('#909090');
      setFoodItem('red');
      setBaveragesItem('#909090');
    } else if (foodMenu === 'baverages') {
      setAll('#909090');
      setFoodItem('#909090');
      setBaveragesItem('red');
    }
  }, [foodMenu]);

  const getFood = value => {
    setFoodMenu(value);
  };

  const AllFood = () => {
    if (foodMenu === 'all') {
      return (
        <View>
          {allFood.map(res => {
            const dataParams = {
              data: res,
              token,
            };

            const dataSubstring = [
              {desc: res.ingredients, value: 60},
              {desc: res.name, value: 25},
            ];
            var fixedDesc;
            var data = [];
            for (var i = 0; i < dataSubstring.length; i++) {
              if (dataSubstring[i].desc.length > dataSubstring[i].value) {
                fixedDesc =
                  dataSubstring[i].desc.substring(0, dataSubstring[i].value) +
                  '...';
              } else {
                fixedDesc = dataSubstring[i].desc;
              }
              data.push({
                key: i,
                desc: fixedDesc,
              });
            }

            return (
              <ItemListFood
                is_active={res.is_active}
                token={token}
                idFood={res.id}
                onPress={() => navigation.navigate('EditMenu', dataParams)}
                price={res.price}
                name={data[1].desc}
                key={res.id}
                ingredients={data[0].desc}
                image={{uri: res.picturePath}}
              />
            );
          })}
        </View>
      );
    } else if (foodMenu === 'food') {
      return (
        <View>
          {food.map(res => {
            const dataSubstring = [
              {desc: res.ingredients, value: 60},
              {desc: res.name, value: 25},
            ];
            var fixedDesc;
            var data = [];
            for (var i = 0; i < dataSubstring.length; i++) {
              if (dataSubstring[i].desc.length > dataSubstring[i].value) {
                fixedDesc =
                  dataSubstring[i].desc.substring(0, dataSubstring[i].value) +
                  '...';
              } else {
                fixedDesc = dataSubstring[i].desc;
              }
              data.push({
                key: i,
                desc: fixedDesc,
              });
            }

            const dataParams = {
              data: res,
              token,
            };
            return (
              <ItemListFood
                is_active={res.is_active}
                token={token}
                idFood={res.id}
                onPress={() => navigation.navigate('EditMenu', dataParams)}
                price={res.price}
                name={data[1].desc}
                key={res.id}
                ingredients={data[0].desc}
                image={{uri: res.picturePath}}
              />
            );
          })}
        </View>
      );
    } else if (foodMenu === 'baverages') {
      return (
        <View>
          {baverages.map(res => {
            const dataParams = {
              data: res,
              token,
            };

            const dataSubstring = [
              {desc: res.ingredients, value: 60},
              {desc: res.name, value: 25},
            ];
            var fixedDesc;
            var data = [];
            for (var i = 0; i < dataSubstring.length; i++) {
              if (dataSubstring[i].desc.length > dataSubstring[i].value) {
                fixedDesc =
                  dataSubstring[i].desc.substring(0, dataSubstring[i].value) +
                  '...';
              } else {
                fixedDesc = dataSubstring[i].desc;
              }
              data.push({
                key: i,
                desc: fixedDesc,
              });
            }
            return (
              <ItemListFood
                is_active={res.is_active}
                token={token}
                idFood={res.id}
                onPress={() => navigation.navigate('EditMenu', dataParams)}
                price={res.price}
                name={data[1].desc}
                key={res.id}
                ingredients={data[0].desc}
                image={{uri: res.picturePath}}
              />
            );
          })}
        </View>
      );
    }
  };

  return (
    <View>
      <View style={styles.buttonSection}>
        <Button color={all} myFood label="All" onPress={() => getFood('all')} />
        <Button
          color={foodItem}
          myFood
          label="Food"
          onPress={() => getFood('food')}
        />
        <Button
          color={baveragesItem}
          myFood
          onPress={() => getFood('baverages')}
          label="Baverages"
        />
      </View>
      <AllFood />
    </View>
  );
};

export default CustomTab;

const styles = StyleSheet.create({
  buttonSection: {
    marginTop: 10,
    paddingHorizontal: 19,
    flexDirection: 'row',
  },
});
