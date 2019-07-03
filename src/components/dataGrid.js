import React, {useContext, useEffect, Fragment, memo} from 'react';
import useGridContext from './contexts/grid'
import useMetaContext from './contexts/meta'

import Table from 'antd/es/table';
import "antd/es/table/style/css"
import * as V from 'victory'

import Bar from 'charts/bar'
import Line from 'charts/line'

const DataGrid = props => {
	const [grid, gridsDispatch] = useGridContext()
	const [meta, metaDispatch] = useMetaContext()

	const sort = (e)=>{
		gridsDispatch({
			action: 'SORT',
			payload: e.target.textContent
		})
	}
	const columns = ()=>{
    if(!meta.headerKeys){
      return []
    }
   
    return meta.headerKeys.map((header, i)=>{
      return {
        title: header,
        dataIndex: header,
        key: header,
      }
    })
  }

	return (
		<Fragment>
  		<Table 
  			dataSource={grid.data}
  			columns={columns()} 
  			rowKey={record => record._id}
        style={{minHeight: '100vh'}}
  		/>
			
		</Fragment>
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