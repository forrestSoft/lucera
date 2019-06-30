import React, {useReducer} from 'react'

import DispatchContext, {MetaContext} from 'context'

const sort = (data, key) =>{
	return data.sort((a,b)=>{
    if(a[key]>b[key]){
      return 1
    }else if (a[key]<b[key]){
      return -1
    }else{
      return 0
    }
  })
}				

const dispatch = (state, action) => {
	switch(action.action){
		case 'DATA_LOADED':
			return {...state, ...action.payload, LOADING:false}
		break;
		case 'SORT':
			return {...state, data: sort(state.data, action.payload)}
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