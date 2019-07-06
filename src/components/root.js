import React, {Fragment, useEffect, useCallback} from 'react'

import useGridContext, {useGridDataContext} from './contexts/grid'
import useMetaContext, {useMetaDispatchContext} from './contexts/meta'
import useFetch from 'hooks/useFetch'
import Grid from 'grid'

import Spin from 'antd/es/spin'
import "antd/es/spin/style/css"

const useGetMeta = ()=>{
  const metaDispatch = useMetaDispatchContext()

  const metaURL = 'http://localhost:3000/meta'
  const metaLoaded = useCallback((payload)=>{
    console.log(11)
    metaDispatch({
      action: 'META_LOADED',
      payload: payload
    })
  }, [metaDispatch])
  const [metaData, metaLoading, metaError] = useFetch(metaURL, metaLoaded)

}

const useBuildURL = ()=>{
  const grid = useGridDataContext()
  if(!grid.filter){
    return outGoingURL
  }
  // debugger
  let filters = ''
  console.log({...grid.filter, ...grid.pagination})
  Object.keys({...grid.filter, ...grid.pagination}).map((filter, i)=>{
    switch(typeof filter){
      case 'string':
      case 'number':
      console.log(`${filter}=${grid.filter[filter]||grid.pagination[filter]}&`)
        filters += `${filter}=${grid.filter[filter]||grid.pagination[filter]}&`
      break;
      case 'array':
        filters += `${filter}=${grid.filter[filter].join(',')}&`
      break;
    }
  })
  
  return `${outGoingURL}${filters}`
}

const outGoingURL = 'http://localhost:3000/query/?'
const useGetData = ()=>{
  const [grid, gridDispatch] = useGridContext()
  const gridURL = useCallback(useBuildURL(),[grid])
  const gridLoaded = useCallback((payload)=>{
    gridDispatch({
      action: 'DATA_LOADED',
      payload: payload
    })
  }, [grid.filter, gridDispatch])
  const [data, dataLoading, dataError] = useFetch(gridURL, gridLoaded)
  
}
const Root = (props) => {
  useGetMeta()
  useGetData()
  
  return ( 
    <Fragment>
      <Grid />
    </Fragment>
  )
}

export default Root