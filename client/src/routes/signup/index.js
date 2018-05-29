import React from 'react'
import Loadable from 'react-loadable'

import Loading from '../../components/loading'

const LoadableComponent = Loadable({
  loader: () => import('./signup'),
  loading: Loading,
})

const LoadableSignup = () => <LoadableComponent />

export default LoadableSignup