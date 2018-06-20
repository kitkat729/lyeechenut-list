import * as types from '../constants/actionTypes'
import axios from 'axios'

export const itemsFetchData = url => {
  return (dispatch) => {
    dispatch(itemsLoading(true));

    axios.get(url)
      .then((response) => {
          if (response.status !== 200) {
              throw Error(response.statusText);
          }

          dispatch(itemsLoading(false));

          return response;
      })
      .then((response) => dispatch(itemsLoaded(response.data)))
      .catch((msg) => dispatch(itemsError(msg)));
  }
}

// items actions
export const itemsLoading = isLoading => {
  return {
    type: types.FETCH_DATA_LOADING,
    isLoading: isLoading,
  }
}

export const itemsLoaded = data => {
  return {
    type: types.FETCH_DATA_SUCCESS,
    data: data
  }
}

export const itemsError = error => {
  return {
    type: types.FETCH_DATA_FAIL,
    error: error
  }
}