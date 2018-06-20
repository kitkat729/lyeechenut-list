import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel';

const styles = theme => ({
  root: {
    textAlign: 'right',
    marginLeft: 16,
    marginRight: 16,
  },
  label: {
    marginRight: 5,
  },
  [theme.breakpoints.up('sm')]: {
    root: {
      marginLeft: 24,
      marginRight: 24,
    },
  }
})

class SorterContainer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      selectedIndex: props.preselected ? parseInt(props.preselected, 10) : -1,
    }
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    }, function() {
      this.props.selections[this.state.selectedIndex].handler()
    })
  }

  render() {
    const { classes, selections } = this.props

    let menuItems = selections.map((selection, index) => {
      return <MenuItem key={index} value={index}>{selection.label}</MenuItem>
    })

    return (
      <div>
        <form className={classes.root} autoComplete="off">
          <InputLabel className={classes.label}>Sort by:</InputLabel>
          <FormControl className={classes.formControl}>
            <Select
              value={this.state.selectedIndex}
              onChange={this.handleChange}
              displayEmpty
              name='selectedIndex'
              className={classes.selectEmpty}
            >
              {menuItems}
            </Select>
          </FormControl>
        </form>
        {this.props.children}
      </div>
    )
  }
}

SorterContainer.propTypes = {
  classes: PropTypes.object.isRequired,
  selections: PropTypes.arrayOf(
    PropTypes.shape({
      field: PropTypes.string,
      order: PropTypes.string,
      label: PropTypes.string.isRequired,
      handler: PropTypes.func.isRequired,
    })
  ).isRequired,
}

export default withStyles(styles, { withTheme: true})(SorterContainer)
