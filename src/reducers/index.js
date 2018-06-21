import { combineReducers } from 'redux'
import { articleListItemsAreLoading, articleListItems, articleListItemsHaveError } from './articleList'

export default combineReducers({
  articleListItemsAreLoading,
  articleListItems,
  articleListItemsHaveError,
})