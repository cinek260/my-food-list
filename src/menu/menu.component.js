import React, { PureComponent } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableHighlight, Alert } from 'react-native';
import colors from '../colors';

export default class Menu extends PureComponent {

  onPressButton = () => {
    Alert.alert('You tapped the button!')
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList data={[
          {key: 'Scanner'},
          {key: 'My List'},
        ]} renderItem={({item}) => <TouchableHighlight onPress={this.onPressButton} underlayColor={colors.SNOW}>
          <View style={styles.menuItem}>
            <Text style={styles.menuItemText}>{item.key}</Text>
          </View>
        </TouchableHighlight>}/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    paddingTop: 50,
    backgroundColor: colors.BDAZZLED_BLUE
  },
  menuItem: {
    backgroundColor: colors.BDAZZLED_BLUE,
    borderBottomWidth: 1,
    borderBottomColor: `${colors.SNOW}33`
  },
  menuItemText: {
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
    fontSize: 20,
    color: colors.SNOW
  },
});
