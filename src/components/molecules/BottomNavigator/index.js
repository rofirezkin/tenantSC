import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {
  IcHomeOff,
  IcHomeOn,
  IcMenuOff,
  IcMenuOn,
  IcOrderOff,
  IcOrderOn,
  IcProfileOff,
  IcProfileOn,
} from '../../../assets';

const Icon = ({label, focus}) => {
  switch (label) {
    case 'Menu':
      return focus ? <IcMenuOn /> : <IcMenuOff />;
    case 'CostumerOrder':
      return focus ? <IcOrderOn /> : <IcOrderOff />;
    case 'History':
      return focus ? <IcHomeOn /> : <IcHomeOff />;

    case 'Profile':
      return focus ? <IcProfileOn /> : <IcProfileOff />;
    default:
      return <IcOrderOn />;
  }
};

const BottomNavigator = ({state, descriptors, navigation}) => {
  return (
    <View style={styles.bottomNav}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            navigation.navigate({name: route.name, merge: true});
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={index}
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}>
            <Icon label={label} focus={isFocused} />
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default BottomNavigator;

const styles = StyleSheet.create({
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingTop: 15,
    paddingBottom: 13,
    paddingHorizontal: 50,
    justifyContent: 'space-between',
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 10},
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 18,
  },
});
