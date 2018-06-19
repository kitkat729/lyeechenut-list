import React, { Component } from 'react'
import moment from 'moment'
import ArticleList from '../components/ArticleList'

export default class ArticleListContainer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      items: [],
      sortField: props.sortField ? props.sortField : false,
      sortOrder: props.sortOrder ? props.sortOrder : 'ASC',
      filterArray: props.filterArray ? props.filterArray : [],
    }
  }

  componentDidMount() {

  }

  add(items) {
    this.setState({
      items: this.state.items.concat(items)
    })
  }

  sort(options) {
    const {field, order} = options

    const compareValue = (a, b, order = 'ASC') => {
      if (order === 'DESC') {
        let temp = a
        a = b
        b = temp
      }

      return (a < b) ? -1
              :(a > b) ? 1
              : 0
    }

    let items = this.state.items.slice(0)

    if (field === 'title') {
      items.sort(function(a, b) {
        const itemA = a[field].toLowerCase()
        const itemB = b[field].toLowerCase()

        return compareValue(itemA, itemB, order)
      })

      this.setState({
        items: items
      })
    }

    if (field === 'created') {
      items.sort(function(a, b, compare) {
        const itemA = moment.utc(a[field], "YYYY-MM-DDTHH:mm:ss").format('x')
        const itemB = moment.utc(b[field], "YYYY-MM-DDTHH:mm:ss").format('x')

        return compareValue(itemA, itemB, order)
      })

      this.setState({
        items: items
      })
    }
  }

  filter(options) {
    const filterArray = options
    let items = this.state.items.slice(0)
    let newItems = [];

    items.forEach( item => {
      if (filterArray.includes(item.vertical)) {
        newItems.push(item)
      }
    })

    this.setState({
      items: newItems
    })
  }

  render() {
    return (
      <ArticleList items={this.state.items} />
    )
  }

}