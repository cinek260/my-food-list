import React, { PureComponent } from 'react';
import { Provider } from 'react-redux';
import { Scene, Router } from 'react-native-router-flux';
import SideMenu from 'react-native-side-menu';
import createStore from './store'
import Menu from './menu/menu.component';
import Scanner from './scanner/scanner.component';
import List from './list/list.component';
import CustomRouter from './customRouter';

const store = createStore();

export default class App extends PureComponent {
  render() {
    const menu = <Menu />
    return (
      <Provider store={store}>
        <SideMenu menu={menu}>
          <CustomRouter>
            <Scene key="root">
              <Scene key="scanner" component={Scanner} title="Scanner"/>
              <Scene key="list" component={List} title="List"/>
            </Scene>
          </CustomRouter>
        </SideMenu>
      </Provider>
    )
  }
}
