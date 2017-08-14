import React, { PureComponent } from 'react';
import Scanner from './scanner/scanner.component';
import { Provider } from 'react-redux';
import createStore from './store'
import SideMenu from 'react-native-side-menu';
import Menu from './menu/menu.component';

const store = createStore();

export default class App extends PureComponent {
  render() {
    const menu = <Menu />
    return (
      <Provider store={store}>
        <SideMenu menu={menu}>
          <Scanner />
        </SideMenu>
      </Provider>
    )
  }
}
