import * as types from '../constants/actionTypes'
import axios from 'axios'

/* The actions defined here are interfaces for the Components */

export const fetchData = (url, config) => {
  return (dispatch) => {
    dispatch(fetchDataLoading(true));

    axios.get(url, config)
      .then((response) => {
          if (response.status !== 200) {
              throw Error(response.statusText);
          }

          dispatch(fetchDataLoading(false));
          return response;
      })
      .then((response) => dispatch(fetchDataLoaded(response.data)))
      .catch((msg) => dispatch(fetchDataError(msg)));
  }
}

export const fetchDataLoading = isLoading => {
  return {
    type: types.ARTICLELIST_FETCH_DATA_LOADING,
    isLoading: isLoading,
  }
}

export const fetchDataLoaded = data => {
  return {
    type: types.ARTICLELIST_FETCH_DATA_SUCCESS,
    data: data
  }
}

export const fetchDataError = error => {
  return {
    type: types.ARTICLELIST_FETCH_DATA_FAIL,
    error: error
  }
}

export const sortBy = (order, comparer) => {
  return {
    type: types.ARTICLELIST_SORT_BY,
    order: order,
    comparer,
  }
}

export const sortByTitle = order => {
  return {
    type: types.ARTICLELIST_SORT_BY_TITLE,
    order: order,
  }
}

export const sortByTitleASC = () => {
  return sortByTitle('ASC')
}

export const sortByTitleDESC = () => {
  return sortByTitle('DESC')
}

export const sortByDate = order => {
  return {
    type: types.ARTICLELIST_SORT_BY_DATE,
    order: order
  }
}

export const sortByDateASC = () => {
  return sortByDate('ASC')
}

export const sortByDateDESC = () => {
  return sortByDate('DESC')
}