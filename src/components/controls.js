import React, {useCallback} from 'react';
import useMetaContext from './contexts/meta'

const Controls = props => {
	// const [meta, metaDispatch] = useContext(MetaContext)
  return (
    <div>
	    <SymbolSelect />
    </div>
  )
}

export default Controls

const SymbolSelect = props => {
	const [meta, metaDispatch] = useMetaContext()

	const handleChange = useCallback((e)=>{
		metaDispatch({
	    action: 'SYMBOL_CHANGED',
	    payload: e.target.value
	  })
	}, [meta.selectedSymbol, metaDispatch])

	return (
		<select 
    	onChange={handleChange}
    	value={meta.selectedSymbol || ''}
    >
    	{
	    	meta.symbolList && meta.symbolList.map((symbol, i)=>{
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