import {
  ARTICLELIST_FETCH_DATA_LOADING,
  ARTICLELIST_FETCH_DATA_SUCCESS,
  ARTICLELIST_FETCH_DATA_FAIL,
  ARTICLELIST_SORT_BY,
  ARTICLELIST_SORT_BY_TITLE,
  ARTICLELIST_SORT_BY_DATE,
} from '../constants/actionTypes'

import moment from 'moment'

export const articleListItemsAreLoading = (state = false, action) => {
  switch (action.type) {
    case ARTICLELIST_FETCH_DATA_LOADING:
      return action.isLoading
    default:
      return state
  }
}

export const articleListItems = (state = [], action) => {
  let items = []

  switch (action.type) {
    case ARTICLELIST_FETCH_DATA_SUCCESS:
      return action.data.list
    case ARTICLELIST_SORT_BY:
      items = state.slice(0)

      items.sort(action.comparer)

      return (action.order === 'ASC') ? items : items.reverse()
    case ARTICLELIST_SORT_BY_TITLE:
      items = state.slice(0)

      items.sort(function(a, b) {
        const itemA = a.title.toLowerCase()
        const itemB = b.title.toLowerCase()

        return (itemA < itemB) ? -1
                :(itemA > itemB) ? 1
                : 0
      })

      return (action.order === 'ASC') ? items : items.reverse()
    case ARTICLELIST_SORT_BY_DATE:
      items = state.slice(0)

      items.sort(function(a, b) {
        const itemA = moment.utc(a.created, "YYYY-MM-DDTHH:mm:ss").format('x')
        const itemB = moment.utc(b.created, "YYYY-MM-DDTHH:mm:ss").format('x')

        return itemA - itemB
      })

      return (action.order === 'ASC') ? items : items.reverse()
    default:
      return state
  }
}

export const articleListItemsHaveError = (state = false, action) => {
  switch (action.type) {
    case ARTICLELIST_FETCH_DATA_FAIL:
      return action.error
    default:
      return state
  }
}