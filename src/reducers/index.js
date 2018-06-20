import { combineReducers } from 'redux'
import { itemsAreLoading, items, itemsHaveError } from './items'

export default combineReducers({
  itemsAreLoading,
  items,
  itemsHaveError,
})