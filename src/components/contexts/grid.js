import React, {useReducer, createContext, useContext} from 'react'

const GridContext = createContext()

const gridDispatch = (state, action) => {
	switch(action.action){
		case 'DATA_LOADED':
			return {...state, ...action.payload, LOADING:false}
		break;
		// case 'SORT':
		// 	return {...state, data: sort(state.data, action.payload)}
		// break;
		default:
			return state
	}
}

export default () => {
  return useContext(GridContext)
}

export const GridProvider = props => {
	const [state, dispatch] = useReducer(gridDispatch, {})
	return (
		<GridContext.Provider 
			value={[state, dispatch]}
		>
			{props.children}
		</GridContext.Provider>
	)
}