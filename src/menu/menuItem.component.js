import React, { PureComponent } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableHighlight } from 'react-native';
import colors from '../colors';
import { Actions } from 'react-native-router-flux';

export default class MenuItem extends PureComponent {

  handlePress = () => {
    Actions[this.props.item.key]();
  }

  render() {
    return (
      <TouchableHighlight onPress={this.handlePress} underlayColor={colors.SNOW}>
        <View style={styles.menuItem}>
          <Text style={styles.menuItemText}>{this.props.item.label}</Text>
        </View>
      </TouchableHighlight>
    )
  }
}

const styles = StyleSheet.create({
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
