import React, {useContext, Fragment, memo} from 'react';
import DispatchContext from 'context'

const DataGrid = props => {
	const [grid, gridsDispatch] = useContext(DispatchContext)
	
  return (
    <table>
    	<tbody>
	    	{grid.LOADING===false &&
		    	<Rows data={grid.data} />
	    	}
    	</tbody>
    </table>
  )
}

export default DataGrid;

// TR
const Rows = (props) => {
  return (
    <Fragment>{rows(props.data)}</Fragment>
  )
}

const rows =  (data)=>{
	return data.map((row, i)=>{
		return (<Row key={`${row.ts}-${i}`} data={row}></Row>)	
	})
}
const Row = memo((props) => {
  return (
    <tr key={props.data._id}>{cells(props.data)}</tr>
  )
})

const cells = (data)=>{
	return Object.keys(data).map((cell, i)=>{
		return (<Cell 
			data={data[cell]}
			key={`${data._id}-${i}`} 
		/>)	

	})
}
// TD
const Cell = memo((props)=>{
	return(<td>{props.data}</td>)
}
)