import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';
import Camera from 'react-native-camera';
import Base64 from 'base-64';
import env from '../../env';

export default class Scanner extends Component {

  constructor() {
    super();
    this.state = {
      type: null,
      data: null,
      bounds: null,
      codeReadedTime: null
    }
    this.basicAuth = Base64.encode(`${env.gs1ApiUserName}:${env.gs1ApiPassword}`);
  }

  render() {
    const { bounds } = this.state;
    return (
      <View style={styles.container}>
        <Camera
          ref={cam => this.camera = cam}
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

  scanCode = async () => {
    const { type, data } = this.state;
    try {
      let response = await fetch(`https://www.produktywsieci.gs1.pl/api/products/${data}?aggregation=SOCIAL`, {
        method: 'GET',
        headers: {
          'Authorization': `Basic ${this.basicAuth}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }
      })
      let responseJson = await response.json();
      console.log(responseJson);
      return;
    } catch(error) {
      console.error(error);
    }

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
      borderColor: 'red'
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
      borderColor: data ? 'rgba(255, 0, 0, 1.0)' : 'rgba(255, 0, 0, .5)',
      backgroundColor: data ? 'rgba(255, 255, 255, 1.0)' : 'rgba(255, 255, 255, .5)',
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
      color: data ? 'rgba(0, 0, 0, 1.0)' : 'rgba(0, 0, 0, .5)'
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
