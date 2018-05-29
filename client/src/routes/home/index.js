import React from 'react'
import Loadable from 'react-loadable'

import Loading from '../../components/loading'

const LoadableComponent = Loadable({
  loader: () => import('./home'),
  loading: Loading,
})

const LoadableHome = () => <LoadableComponent />

export default LoadableHome