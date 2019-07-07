import React, {useReducer, createContext, useContext} from 'react'

const GridDataContext = createContext()
const GridDispatchContext = createContext()

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
			return {...state, ...action.payload, loading:false}
		break;
		// case 'SORT':
		// 	return {...state, data: sort(state.data, action.payload)}
		// break;
		case 'SYMBOL_OPTION_CHANGE':
			const mappedOptions = state.symbolList.filter((symbol, i)=>{
				console.log(symbol)
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
		case 'LP_OPTION_CHANGE':
			const mappedLPs = state.lpList.filter((lp, i)=>{
					return (action.payload.includes(i))
			})
			return {
				...state,
				filter: {
					...state.filter, 
					lp:mappedLPs
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
			return {
					...state,
					pagination: {...state.pagination, ...action.payload}
				}
		default:
			return state
	}
}

export default () => {
  return [useContext(GridDataContext), useContext(GridDispatchContext)]
}

export const useGridDataContext = ()=>{
	return useContext(GridDataContext)
}

export const useGridDispatchContext = ()=>{
	return useContext(GridDispatchContext)
}

export const GridProvider = props => {
	const [state, dispatch] = useReducer(useGridDispatch, initialState())

	return (
		<GridDispatchContext.Provider value={dispatch}>
			<GridDataContext.Provider value={state}>
			{props.children}
			</GridDataContext.Provider>
		</GridDispatchContext.Provider>
	)
}