import React from 'react';
import {View, Text, Image} from 'react-native';
function TabBarItem({icon, selectedIcon, focused, name}) {
  return (
    <View style={{flex: 1}}>
      {focused ? (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Image style={{width: 45, height: 45}} source={selectedIcon} />
          <Text style={{fontSize: 12, textAlign: 'center'}}>{name}</Text>
        </View>
      ) : (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Image
            style={{width: 35, height: 35, marginVertical: 5}}
            source={icon}
          />
          <Text style={{fontSize: 12, textAlign: 'center'}}>{name}</Text>
        </View>
      )}
    </View>
  );
}

export default TabBarItem;
