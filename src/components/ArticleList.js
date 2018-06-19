import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'

import ArticleCardItem from './ArticleCardItem'

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 400,
    display: 'flex',
    flexWrap: 'wrap',
    margin: 'auto',
  },
  [theme.breakpoints.up('sm')]: {
    root: {
      maxWidth: 809
    }
  }
})

function getListItem(item) {
  return <ArticleCardItem item={item} />
}

const ArticleList = (props) => {
  const { classes, items } = props

  let list = items.map( (item, index) => {
    return <ListItem key={index}>{getListItem(item)}</ListItem>
  })

  return (
    <List className={classes.root}>
      {list}
      {props.children}
    </List>
  )
}

ArticleList.propTypes = {
  classes: PropTypes.object.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.object,
  ).isRequired,
}

export default withStyles(styles, { withTheme: true })(ArticleList)