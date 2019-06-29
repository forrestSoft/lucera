import React, {useEffect, useContext } from 'react'

import DispatchContext, {MetaContext} from 'context'

import Grid from 'grid'

const outGoingURL = 'http://localhost:3000/query'
const Root = (props) => {
	const [grid, gridsDispatch] = useContext(DispatchContext)
	const [meta, metaDispatch] = useContext(MetaContext)

  useEffect(()=>{
		fetch('http://localhost:3000/meta')
      .then(response=>response.json())
      .then((response)=>{
        metaDispatch({
          action: 'META_LOADED',
          payload: response
        })
    	})
  }, [])

  useEffect(()=>{
  	fetch(`${outGoingURL}?sym=${meta.selectedSymbol}`)
      .then(response=>response.json())
      .then((response)=>{
        gridsDispatch({
          action: 'DATA_LOADED',
          payload: response
        })
    	})
  }, [meta.selectedSymbol])

  return <Grid />
}

export default Root