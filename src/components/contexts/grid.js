import React, {useReducer, createContext, useContext} from 'react'
import useMetaContext from './meta'

const GridContext = createContext()

const initialState =() =>{

	return{
		loading: true,
		symbolList: [],
		filter:{
			sym: []
		},
		pagination: {
			current: 1,
			total: 0
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
		break;
		case 'ASK_PRICE_CHANGE':
			return {
				...state,
				filter: {
					...state.filter, 
					ask_price:action.payload
				}
			}
		break;
		case 'PAGINATION_CLICK':
			return {
					...state,
					pagination: {...state.pagination, ...action.payload}
				}
		case 'PAGINATION_SIZE_CHANGE':
			debugger
			return {
					...state,
					pagination: {...state.pagination, ...action.payload}
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