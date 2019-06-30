import React, {useContext, useCallback} from 'react';
import {MetaContext} from 'context'

const Controls = props => {
	const [meta, metaDispatch] = useContext(MetaContext)
  return (
    <div>
	    {meta.LOADING === false && <SymbolSelect />}
    </div>
  )
}

export default Controls

const SymbolSelect = props => {
	const [meta, metaDispatch] = useContext(MetaContext)

	const handleChange = useCallback((e)=>{
		metaDispatch({
	    action: 'SYMBOL_CHANGED',
	    payload: e.target.value
	  })
	}, [meta.selectedSymbol, metaDispatch])

	return (
		<select 
    	onChange={handleChange}
    	value={meta.selectedSymbol}
    >
    	{
	    	Object.keys(meta.symbolList).map((symbol, i)=>{
	    		return(
	    			<option value={symbol} key={symbol}>
    					{symbol}
  					</option>
					)
	    	})
    	}
    </select>
    )
  }