import React, {Fragment, useEffect, useCallback} from 'react'

import useGridContext from './contexts/grid'
import useMetaContext from './contexts/meta'
import useFetch from 'hooks/useFetch'
import Grid from 'grid'

import Spin from 'antd/es/spin'
import "antd/es/spin/style/css"

const outGoingURL = 'http://localhost:3000/query'
const Root = (props) => {
	const [grid, gridDispatch] = useGridContext()
	const [meta, metaDispatch] = useMetaContext()
  // debugger
  const metaURL = 'http://localhost:3000/meta'

  // let data, dataLoading, dataError, metaData, metaLoading, metaError
  const metaLoaded = useCallback((payload)=>{
    metaDispatch({
      action: 'META_LOADED',
      payload: payload
    })
  }, [metaDispatch])
  const [metaData, metaLoading, metaError] = useFetch(metaURL, metaLoaded)

  const gridURL = `${outGoingURL}?sym=${meta.selectedSymbol}&count=10`
  const gridLoaded = useCallback((payload)=>{
    
  }, [gridDispatch])
  const [data, dataLoading, dataError] = useFetch(gridURL, gridLoaded)
  // console.log(grid, !grid.loading , !dataLoading , !meta.loading , metaLoading)
  return ( 
    <Fragment>
      <Grid />
    </Fragment>
  )
}

export default Root