import React from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import colors from '../colors';
import MenuItem from './menuItem.component';

export default () => (
  <View style={styles.container}>
    <FlatList data={[
      {key: 'scanner', label: 'Scanner'},
      {key: 'list', label: 'My List'},
    ]} renderItem={({item}) => <MenuItem item={item} />}/>
  </View>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    paddingTop: 50,
    backgroundColor: colors.BDAZZLED_BLUE
  }
});
