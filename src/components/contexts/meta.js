import React, {useReducer, createContext, useContext} from 'react'

const MetaDataContext = createContext({loading: true, headerKeys: []})
const MetaDispatchContext = createContext({loading: true, headerKeys: []})

const metaDispatch = (state, action) => {
	switch(action.action){
		case 'META_LOADED':
			return {
				...action.payload,
				loading: false,
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
  return [useContext(MetaDataContext), useContext(MetaDispatchContext)]
}

export const useMetaDataContext = () =>{
	return useContext(MetaDataContext)
}

export const useMetaDispatchContext = () =>{
	return useContext(MetaDispatchContext)
}

export const MetaProvider = props => {
	const [state, dispatch] = useReducer(metaDispatch, {})

	return (
		<MetaDispatchContext.Provider value={dispatch}>
			<MetaDataContext.Provider value={state}>
				{props.children}
			</MetaDataContext.Provider>
		</MetaDispatchContext.Provider>
	)
}