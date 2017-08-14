import React, { PureComponent } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';
import colors from '../colors';

class List extends PureComponent {
  render() {
    const { productsList } = this.props;
    const products = productsList.valueSeq().map(item => <Text key={item.getIn(['product', 'GTIN'])}style={styles.text}>{item.getIn(['product','ProductName'])}</Text>)
    return (
      <View style={styles.container}>
        {products}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  text: {
    color: colors.BDAZZLED_BLUE
  }
});

export default connect(state => ({
  productsList: state.scannerReducer.get('productsList')
}), null)(List);
