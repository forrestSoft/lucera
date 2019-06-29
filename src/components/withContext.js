import React, {useReducer} from 'react'

import DispatchContext, {MetaContext} from 'context'

const dispatch = (state, action) => {
	switch(action.action){
		case 'DATA_LOADED':
			return {...action.payload, LOADING:false}
		break;
		default:
			return state
	}
}

const metaDispatch = (state, action) => {
	switch(action.action){
		case 'META_LOADED':
			return {
				...action.payload,
				LOADING:false,
				selectedSymbol: Object.keys(action.payload.symbolList)[0]
			}
		break;
		case 'SYMBOL_CHANGED':
			return {
				...state,
				selectedSymbol: action.payload
			}
		default:
			return state
		break;
	}
}

const WithContext = (props) => {
	return(
		<MetaContext.Provider value={useReducer(metaDispatch, {})}>
			<DispatchContext.Provider value={useReducer(dispatch, {})}>
				<div>{props.children}</div>
			</DispatchContext.Provider>
		</MetaContext.Provider>
	)

}
export default WithContext