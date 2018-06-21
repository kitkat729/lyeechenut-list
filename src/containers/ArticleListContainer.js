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

    this.state = {
      initialLoad: false,
    }

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

    console.log(this.sortSelections[this.sortPreselected])
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.items.length > 0 && !this.state.initialLoad && this.sortPreselected != -1) {
      this.sortSelections[this.sortPreselected].handler()
      this.setState({ initialLoad: true })
    }
  }

  componentDidMount() {
    if (this.props.endpoint.url) {
      this.props.fetch(this.props.endpoint.url, this.props.endpoint.config)
    }
  }

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
