import React, { Component } from 'react'
import axios from 'axios'
import ArticleList from '../components/ArticleList'

export default class ArticleListContainer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      items: [],
    }

    this.sortSelections = []
    this.sortPreselected = -1

    // if a sortMap is provided, the list can sort
    if (this.props.sortMap) {
      this.props.sortMap.forEach((field, key) => {
        if (field.orderings) {
          for (let i in field.orderings) {
            this.sortSelections.push({
              field: key,
              order: field.orderings[i].type,
              label: field.orderings[i].label,
              handler: function() {
                this.sort({
                  field: key,
                  order: field.orderings[i].type,
                })
              }.bind(this)
            })
          }
        }
      }, this)

      for(let i in this.sortSelections) {
        if (this.sortSelections[i].field === this.props.sortField && this.sortSelections[i].order === this.props.sortOrder) {
          this.sortPreselected = i
        }
      }
    }
  }

  componentDidMount() {
    if (this.props.url) {
      this.fetch(this.props.url, function(items) {
        this.add(items)

        if (this.props.sortField) {
          const sortOptions = {
            field: this.props.sortField,
            order: this.props.sortOrder ? this.props.sortOrder : 'ASC',
          }
          this.sort(sortOptions)
        }
      }.bind(this))
    }
  }

  add(items) {
    this.setState({
      items: this.state.items.concat(items)
    })
  }

  fetch(url, callback) {
    axios.get(this.props.url)
      .then( res => {
        const articles = res.data

        if (articles.status) {
          let items = articles.data.list.map( item => {
            item.thumbnail = '//assets3.thrillist.com/v1/image/'+item.image_id
            return item
          })

          callback(items)
        }
      })
  }

  sort(options) {
    const {field, order} = options

    let items = this.state.items.slice(0)

    if (this.props.sortMap && !this.props.sortMap.has(field)) {
      throw new Error('"' + field + '" was not mapped properly')
    }

    if (typeof this.props.sortMap.get(field).comparer !== 'function') {
      throw new Error('"' + field + '" comparer must be a function')
    }

    items.sort(this.props.sortMap.get(field).comparer)

    this.setState({
      items: (order === 'ASC' || !order) ? items : items.reverse()
    })
  }

  render() {
    let props = {
      items: this.state.items,
      selections: this.sortSelections,
      preselected: this.sortPreselected,
    }

    return (
      <ArticleList {...props} />
    )
  }

}

