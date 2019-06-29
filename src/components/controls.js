import React, {useContext, useCallback} from 'react';
import {MetaContext} from 'context'

const Controls = props => {
	const [meta, metaDispatch] = useContext(MetaContext)

	const handleChange = useCallback((e)=>{
		metaDispatch({
	    action: 'SYMBOL_CHANGED',
	    payload: e.target.value
	  })
	}, [meta.selectedSymbol, metaDispatch])

  return (
    <div>
	    <select 
	    	onChange={handleChange}
	    	value={meta.selectedSymbol}
	    >
	    	{meta.LOADING === false &&
		    	Object.keys(meta.symbolList).map((symbol, i)=>{
		    		return(
		    			<option value={symbol} key={symbol}>
	    					{symbol}
    					</option>)
		    	})
	    	}
	    </select>
    </div>
  )
}

export default Controls;