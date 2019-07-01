import React, {useReducer, createContext, useContext} from 'react'

const MetaContext = createContext()

const metaDispatch = (state, action) => {
	switch(action.action){
		case 'META_LOADED':
			return {
				...action.payload,
				LOADING:false,
				selectedSymbol: (action.payload &&action.payload.symbolList && action.payload.symbolList[0]) || null
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
export default () => {
  return useContext(MetaContext)
}

export const MetaProvider = props => {
	const [state, dispatch] = useReducer(metaDispatch, {})

	return (
		<MetaContext.Provider 
			value={[state, dispatch]}
		>
			{props.children}
		</MetaContext.Provider>
	)
}