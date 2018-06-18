import React from 'react'
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
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  thumbnail: {
    width: 400,
    height: 150,
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
          <Typography variant="title">{item.title}</Typography>
          <Typography variant="subheading">{item.vertical} {momentstamp}</Typography>
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