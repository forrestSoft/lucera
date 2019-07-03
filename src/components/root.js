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
  
  const metaURL = 'http://localhost:3000/meta'
  const metaLoaded = useCallback((payload)=>{
    metaDispatch({
      action: 'META_LOADED',
      payload: payload
    })
  }, [metaDispatch])
  const [metaData, metaLoading, metaError] = useFetch(metaURL, metaLoaded)

  const buildURL = ()=>{
      console.log(grid.filters, !grid.filters)
    if(!grid.filter){
      return outGoingURL
    }

      
    let filters = ''
    Object.keys(grid.filter).map((filter, i)=>{
      
      filters += `${filter}=${grid.filter[filter].join(',')}`
    })
    
    return `${outGoingURL}?${filters}`
    
  }
  const gridURL = buildURL()
  const gridLoaded = useCallback((payload)=>{
    gridDispatch({
      action: 'DATA_LOADED',
      payload: payload
    })
  }, [grid.filter, gridDispatch])
  const [data, dataLoading, dataError] = useFetch(buildURL(), gridLoaded)
  
  return ( 
    <Fragment>
      <Grid />
    </Fragment>
  )
}

export default Root