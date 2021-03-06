import React, { PureComponent } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Camera from 'react-native-camera';
import { connect } from 'react-redux';
import getCodeData from './scanner.actions';
import colors from '../colors';

class Scanner extends PureComponent {

  constructor() {
    super();
    this.state = {
      type: null,
      data: null,
      bounds: null,
      codeReadedTime: null
    }
  }

  handleBarCodeRead = ({type, data, bounds}) => {
    this.setState({ type, data, bounds, codeReadedTime: new Date().getTime() });
    setTimeout(() => this.hideBarcodeScanner(), 300)
  }

  hideBarcodeScanner = () => {
    const { codeReadedTime } = this.state;
    if (codeReadedTime + 300 <= new Date().getTime()) {
      this.setState({ type: null, data: null, bounds: null, codeReadedTime: null });
    }
  }

  scanCode = () => {
    const { type, data } = this.state;
    const { basicAuth } = this.props;
    this.props.getCodeData(data, basicAuth);
  }

  render() {
    const { bounds } = this.state;
    return (
      <View style={styles.container}>
        <Camera
          onBarCodeRead={this.handleBarCodeRead}
          style={styles.preview}>
          <View style={this.setScannerStyle()}></View>
          <View style={this.setButtonStyle()}>
            <Text style={this.setTextButtonStyle()} onPress={this.scanCode}>Scan</Text>
          </View>
        </Camera>
      </View>
    );
  }

  setScannerStyle = () => {
    const { bounds } = this.state;
    const styles = bounds ? {
      width: Math.round(bounds.size.width),
      height: Math.round(bounds.size.height),
      top: Math.round(bounds.origin.y),
      left: Math.round(bounds.origin.x),
      position: 'absolute',
      borderWidth: 2,
      borderColor: colors.CARIBBEAN_GREEN
    } : {
      display: 'none'
    }
    return styles;
  }

  setButtonStyle = () => {
    const { data } = this.state;
    const styles = {
      padding: 10,
      margin: 40,
      borderWidth: 5,
      borderColor: `${colors.SNOW}33`,
      backgroundColor: data ? colors.CARIBBEAN_GREEN : colors.INFRA_RED,
      borderRadius: 50,
      width: 100,
      height: 100,
      justifyContent:'center'
    }
    return styles;
  }

  setTextButtonStyle = () => {
    const { data } = this.state;
    const styles = {
      fontSize: 20,
      textAlign: 'center',
      fontWeight: 'bold',
      color: colors.SNOW
    }
    return styles;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  }
});

export default connect(state => ({
  basicAuth: state.scannerReducer.get('basicAuth'),
  loading: state.scannerReducer.get('loading'),
  productsList: state.scannerReducer.get('productsList')
}), {
  getCodeData
})(Scanner);
