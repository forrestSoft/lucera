import React, {useReducer, createContext, useContext} from 'react'
import useMetaContext from './meta'

const GridContext = createContext()

const initialState =() =>{

	return{
		loadng: true,
		symbolList: [],
		filter:{
			sym: []
		}
	}
}

const useGridDispatch = (state, action) => {
	switch(action.action){
		case 'DATA_LOADED': 
		// debugger
			return {...state, ...action.payload, loading:false}
		break;
		// case 'SORT':
		// 	return {...state, data: sort(state.data, action.payload)}
		// break;
		case 'SYMBOL_OPTION_CHANGE':
		console.log(3)
			const mappedOptions = state.symbolList.filter((symbol, i)=>{
				return (action.payload.includes(i))
			})

			return {
				...state,
				filter: {
					...state.filter, 
					sym:mappedOptions
				}
			}
		default:
			return state
	}
}

export default () => {
  return useContext(GridContext)
}

export const GridProvider = props => {
	const [state, dispatch] = useReducer(useGridDispatch, initialState())

	return (
		<GridContext.Provider 
			value={[state, dispatch]}
		>
			{props.children}
		</GridContext.Provider>
	)
}