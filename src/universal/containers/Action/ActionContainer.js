import {injectGlobal} from 'react-emotion'
import PropTypes from 'prop-types'
import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import Action from 'universal/components/Action/Action'
import globalStyles from 'universal/styles/theme/globalStyles'

class ActionContainer extends Component {
  static propTypes = {
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired
    }).isRequired,
    params: PropTypes.object
  }

  constructor (props) {
    super(props)
    injectGlobal(globalStyles)
  }

  render () {
    return <Action {...this.props} />
  }
}

export default withRouter(ActionContainer)
