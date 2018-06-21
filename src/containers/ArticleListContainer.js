import React, { Component } from 'react'
import { connect } from 'react-redux'
import ArticleList from '../components/ArticleList'

import { fetchData, sortBy } from '../actions/articleList';

const mapStateToProps = state => {
  return {
    items: state.articleListItems,
    hasError: state.articleListItemsHaveError,
    isLoading: state.articleListItemsAreLoading
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetch: (url, config = {}) => dispatch(fetchData(url, config)),
    sortBy: (order, comparer) => dispatch(sortBy(order, comparer)),
  };
};

class ArticleListContainer extends Component {
  constructor(props) {
    super(props)

    // this.state = {
    //   items: [],
    // }

    this.sortSelections = []
    this.sortPreselected = -1

    // if a sortMap is provided, the list can sort
    if (this.props.endpoint.sortMap) {
      this.props.endpoint.sortMap.forEach((field, key) => {
        if (field.orderings) {
          for (let i in field.orderings) {
            this.sortSelections.push({
              field: key,
              order: field.orderings[i].type,
              label: field.orderings[i].label,
              handler: function() {
                this.props.sortBy(field.orderings[i].type, this.props.endpoint.sortMap.get(key).comparer)
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
    if (this.props.endpoint.url) {
      // this.fetch(this.props.url, function(items) {
      //   this.add(items)

      //   if (this.props.sortMap && this.props.sortField) {
      //     const sortOptions = {
      //       field: this.props.sortField,
      //       order: this.props.sortOrder ? this.props.sortOrder : 'ASC',
      //     }
      //     this.sort(sortOptions)
      //   }
      // }.bind(this))

      // Redux implementation
      this.props.fetch(this.props.endpoint.url, this.props.endpoint.config)
    }
  }

  // sort(options) {
  //   const {field, order} = options

  //   let items = this.state.items.slice(0)

  //   if (!this.props.endpoint.sortMap.has(field)) {
  //     throw new Error('"' + field + '" was not mapped properly')
  //   }

  //   if (typeof this.props.endpoint.sortMap.get(field).comparer !== 'function') {
  //     throw new Error('"' + field + '" comparer must be a function')
  //   }

  //   items.sort(this.props.endpoint.sortMap.get(field).comparer)

  //   this.setState({
  //     items: (order === 'ASC' || !order) ? items : items.reverse()
  //   })
  // }

  render() {
    let props = {
      items: this.props.items,
      selections: this.sortSelections,
      preselected: this.sortPreselected,
    }

    return (
      <ArticleList {...props} />
    )
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(ArticleListContainer)
