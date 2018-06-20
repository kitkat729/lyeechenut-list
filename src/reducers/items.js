export const itemsAreLoading = (state = false, action) => {
  switch (action.type) {
    case 'FETCH_DATA_LOADING':
      return action.isLoading
    default:
      return state
  }
}

export const items = (state = [], action) => {
  console.log('reducer')
  console.log(action)
  switch (action.type) {
    case 'FETCH_DATA_SUCCESS':
      let items = []
      const articles = action.data

      if (!articles.status) {
        return state
      }

      items = articles.data.list.map( item => {
        item.thumbnail = '//assets3.thrillist.com/v1/image/'+item.image_id
        return item
      })

      return items
    default:
      return state
  }
}

export const itemsHaveError = (state = false, action) => {
  switch (action.type) {
    case 'FETCH_DATA_ERROR':
      return action.error
    default:
      return state
  }
}