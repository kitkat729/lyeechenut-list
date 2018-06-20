import React from 'react'
//import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import moment from 'moment'

const styles = theme => ({
  card: {
    display: 'flex',
    width: '100%'
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  thumbnail: {
    width: 368, // this value is relative to list.width - listitem.padding. It can be calculated if theme contains the relative value
    height: 150,
  },
  link: {
    textDecoration: 'none',
  },
  [theme.breakpoints.up('sm')]: {
    details: {
      flexDirection: 'row',
    },
    content: {
      flexShrink: 1,
    },
    thumbnail: {
      flex: '1 0 auto',
      width: 352,
      height: 225,
      padding: 0,
    },
  }
})

const ArticleCardItem = (props) => {
  const { classes, item } = props
  const momentstamp = moment.utc(item.created, "YYYY-MM-DDTHH:mm:ss").fromNow()

  return (
    <Card className={classes.card}>
      <div className={classes.details}>
        <CardMedia
          className={classes.thumbnail}
          image={item.thumbnail}
          title=""
        />
        <CardContent className={classes.content}>
          <Typography gutterBottom variant="title" className={classes.link} component="a" href="#article">{item.title}</Typography>
          <Typography variant="subheading" component="a" href="#category" color="textSecondary" className={classes.link}>{item.vertical} | {momentstamp}</Typography>
        </CardContent>
      </div>
    </Card>
  ) 
}

ArticleCardItem.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  item: PropTypes.shape({
    title: PropTypes.string.isRequired,
    vertical: PropTypes.string.isRequired,
    thumbnail: PropTypes.string.isRequired,
    created: PropTypes.string.isRequired,
  }).isRequired,
}

export default withStyles(styles, { withTheme: true })(ArticleCardItem)