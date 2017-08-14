import fetchCodeData from './scanner.service';

const getCodeDataSuccess = (payload) => ({
  type: 'GET_CODE_DATA_SUCCESS',
  payload
})

const getCodeDataError = (payload) => ({
  type: 'GET_CODE_DATA_ERROR',
  payload
})

export default (data, basicAuth) => {
  return dispatch => dispatch({
    type: 'GET_CODE_DATA',
    payload: fetchCodeData(data, basicAuth).then(
      success => {
        if (success.success) { return dispatch(getCodeDataSuccess(success)) }
        else { return dispatch(getCodeDataError(success)) }
      },
      error => dispatch(getCodeDataError(error))
    )
  });
}
