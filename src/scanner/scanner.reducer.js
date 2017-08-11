import Base64 from 'base-64';
import env from '../../env';
import { Map, fromJS } from 'immutable';

export const scannerState = fromJS({
  basicAuth: Base64.encode(`${env.gs1ApiUserName}:${env.gs1ApiPassword}`),
  loading: false,
  productsList: new Map([])
})

export default function scannerReducer(state = scannerState, action) {
  const { type, payload } = action;
  switch (type) {
    case 'GET_CODE_DATA': {
      return state.set('loading', true);
    }
    case 'GET_CODE_DATA_SUCCESS': {
      const { success } = payload;
      if (state.getIn(['productsList', success.GTIN])) {
        state = state.setIn(['productsList', success.GTIN, 'count'], state.getIn(['productsList', success.GTIN, 'count']) + 1)
      } else {
        state = state.setIn(['productsList', success.GTIN], fromJS({ count: 1, product: success }))
      }
      return state.set('loading', false);
    }
    case 'GET_CODE_DATA_ERROR': {
      return state.set('loading', false);
    }
    default:
      return state;
  }
}
