import React, {useEffect, useCallback} from 'react'

import useGridContext from './contexts/grid'
import useMetaContext from './contexts/meta'
import useFetch from 'hooks/useFetch'
import Grid from 'grid'


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

  const gridURL = `${outGoingURL}?sym=${meta.selectedSymbol}&count=10`
  const gridLoaded = useCallback((payload)=>{
    gridDispatch({
      action: 'DATA_LOADED',
      payload: payload
    })
  }, [gridDispatch])
  const [data, dataLoading, dataError] = useFetch(gridURL, gridLoaded)
  
  return ( 
      <Grid />
  )
}

export default Root