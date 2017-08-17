import React, {PureComponent} from 'react';
import {Router, Reducer} from 'react-native-router-flux';
import {connect} from 'react-redux';

class CustomRouter extends PureComponent {
  reducerCreate = (params) => {
    const defaultReducer = new Reducer(params);
    let newState = null;
    return (state, action) => {
      this.props.dispatch(action);
      return defaultReducer(state, action);
    };
  }

  render() {
    return (
      <Router createReducer={this.reducerCreate} >
        {this.props.children}
      </Router>
    );
  }
}

export default connect()(CustomRouter);
